import * as Core from '../core';
import { type CompletionCreateResponse } from '../resources/chat/completions';
import {
  type Completions,
  type CompletionCreateResponse as ChatCompletion,
  type CompletionCreateParamsBase,
  type CompletionCreateParams as ChatCompletionCreateParams,
} from '../resources/chat/completions';
import { APIUserAbortError, PropulsionAIError } from '../error';
import {
  type RunnableFunction,
  isRunnableFunctionWithParse,
  type BaseFunctionsArgs,
} from './RunnableFunction';
import { ChatCompletionToolRunnerParams } from './ChatCompletionRunner';
import { ChatCompletionStreamingToolRunnerParams } from './ChatCompletionStreamingRunner';
import { isToolMessage, isAssistantMessage } from './chatCompletionUtils';

const DEFAULT_MAX_CHAT_COMPLETIONS = 10;
export interface RunnerOptions extends Core.RequestOptions {
  /** How many requests to make before canceling. Default 10. */
  maxChatCompletions?: number;
}

type CompletionUsage = CompletionCreateResponse.Usage;
type ChatCompletionMessage = CompletionCreateParamsBase.Message;
type ChatCompletionMessageParam = CompletionCreateParamsBase.Message;
type ChatCompletionTool = CompletionCreateParamsBase.Tool;

export abstract class AbstractChatCompletionRunner<
  Events extends CustomEvents<any> = AbstractChatCompletionRunnerEvents,
> {
  controller: AbortController = new AbortController();

  #connectedPromise: Promise<void>;
  #resolveConnectedPromise: () => void = () => {};
  #rejectConnectedPromise: (error: PropulsionAIError) => void = () => {};

  #endPromise: Promise<void>;
  #resolveEndPromise: () => void = () => {};
  #rejectEndPromise: (error: PropulsionAIError) => void = () => {};

  #listeners: { [Event in keyof Events]?: ListenersForEvent<Events, Event> } = {};

  protected _chatCompletions: ChatCompletion[] = [];
  messages: ChatCompletionMessageParam[] = [];
  task_id: string | null = null;

  #ended = false;
  #errored = false;
  #aborted = false;
  #catchingPromiseCreated = false;

  constructor() {
    this.#connectedPromise = new Promise<void>((resolve, reject) => {
      this.#resolveConnectedPromise = resolve;
      this.#rejectConnectedPromise = reject;
    });

    this.#endPromise = new Promise<void>((resolve, reject) => {
      this.#resolveEndPromise = resolve;
      this.#rejectEndPromise = reject;
    });

    // Don't let these promises cause unhandled rejection errors.
    // we will manually cause an unhandled rejection error later
    // if the user hasn't registered any error listener or called
    // any promise-returning method.
    this.#connectedPromise.catch(() => {});
    this.#endPromise.catch(() => {});
  }

  protected _run(executor: () => Promise<any>) {
    // Unfortunately if we call `executor()` immediately we get runtime errors about
    // references to `this` before the `super()` constructor call returns.
    setTimeout(() => {
      executor().then(() => {
        this._emitFinal();
        this._emit('end');
      }, this.#handleError);
    }, 0);
  }

  protected _addChatCompletion(chatCompletion: ChatCompletion): ChatCompletion {
    this._chatCompletions.push(chatCompletion);
    this._emit('chatCompletion', chatCompletion);
    const message = chatCompletion.choices[0]?.message;
    if (message) this._addMessage(message as ChatCompletionMessageParam);
    return chatCompletion;
  }

  protected _addMessage(message: ChatCompletionMessageParam, emit = true) {
    if (!('content' in message)) message.content = '';

    this.messages.push(message);

    if (emit) {
      this._emit('message', message);
      if (isToolMessage(message) && message.content) {
        // Note, this assumes that {role: 'tool', content: …} is always the result of a call of tool of type=function.
        this._emit('functionCallResult', message.content as string);
      }
    }
  }

  protected _set_task_id(task_id: string) {
    this.task_id = task_id;
  }

  protected _connected() {
    if (this.ended) return;
    this.#resolveConnectedPromise();
    this._emit('connect');
  }

  get ended(): boolean {
    return this.#ended;
  }

  get errored(): boolean {
    return this.#errored;
  }

  get aborted(): boolean {
    return this.#aborted;
  }

  abort() {
    this.controller.abort();
  }

  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  on<Event extends keyof Events>(event: Event, listener: ListenerForEvent<Events, Event>): this {
    const listeners: ListenersForEvent<Events, Event> =
      this.#listeners[event] || (this.#listeners[event] = []);
    listeners.push({ listener });
    return this;
  }

  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off<Event extends keyof Events>(event: Event, listener: ListenerForEvent<Events, Event>): this {
    const listeners = this.#listeners[event];
    if (!listeners) return this;
    const index = listeners.findIndex((l) => l.listener === listener);
    if (index >= 0) listeners.splice(index, 1);
    return this;
  }

  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once<Event extends keyof Events>(event: Event, listener: ListenerForEvent<Events, Event>): this {
    const listeners: ListenersForEvent<Events, Event> =
      this.#listeners[event] || (this.#listeners[event] = []);
    listeners.push({ listener, once: true });
    return this;
  }

  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted<Event extends keyof Events>(
    event: Event,
  ): Promise<
    EventParameters<Events, Event> extends [infer Param] ? Param
    : EventParameters<Events, Event> extends [] ? void
    : EventParameters<Events, Event>
  > {
    return new Promise((resolve, reject) => {
      this.#catchingPromiseCreated = true;
      if (event !== 'error') this.once('error', reject);
      this.once(event, resolve as any);
    });
  }

  async done(): Promise<void> {
    this.#catchingPromiseCreated = true;
    await this.#endPromise;
  }

  /**
   * @returns a promise that resolves with the final ChatCompletion, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
   */
  async finalChatCompletion(): Promise<ChatCompletion> {
    await this.done();
    const completion = this._chatCompletions[this._chatCompletions.length - 1];
    if (!completion) throw new PropulsionAIError('stream ended without producing a ChatCompletion');
    return completion;
  }

  #getFinalContent(): string | null {
    return this.#getFinalMessage().content ?? null;
  }

  /**
   * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalContent(): Promise<string | null> {
    await this.done();
    return this.#getFinalContent();
  }

  #getFinalMessage(): ChatCompletionMessage {
    let i = this.messages.length;
    while (i-- > 0) {
      const message = this.messages[i];
      if (isAssistantMessage(message)) {
        let { ...rest } = message;
        if (!message.content) {
          message.content = '';
        }
        const ret: ChatCompletionMessage = { ...rest, content: message.content ?? null };
        // if (function_call) {
        //   ret.function_call = function_call;
        // }
        return ret;
      }
    }
    throw new PropulsionAIError('stream ended without producing a ChatCompletionMessage with role=assistant');
  }

  /**
   * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
   * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalMessage(): Promise<ChatCompletionMessage> {
    await this.done();
    return this.#getFinalMessage();
  }

  // #getFinalFunctionCall(): ChatCompletionMessage.FunctionCall | undefined {
  //   for (let i = this.messages.length - 1; i >= 0; i--) {
  //     const message = this.messages[i];
  //     // if (isAssistantMessage(message) && message?.function_call) {
  //     //   return message.function_call;
  //     // }
  //     // if (isAssistantMessage(message) && message?.tool_calls?.length) {
  //     //   return message.tool_calls.at(-1)?.function;
  //     // }
  //   }

  //   return;
  // }

  /**
   * @returns a promise that resolves with the content of the final FunctionCall, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  // async finalFunctionCall(): Promise<ChatCompletionMessage.FunctionCall | undefined> {
  //   await this.done();
  //   return this.#getFinalFunctionCall();
  // }

  // #getFinalFunctionCallResult(): string | undefined {
  //   for (let i = this.messages.length - 1; i >= 0; i--) {
  //     const message = this.messages[i];
  //     if (isFunctionMessage(message) && message.content != null) {
  //       return message.content;
  //     }
  //     if (
  //       isToolMessage(message) &&
  //       message.content != null &&
  //       this.messages.some(
  //         (x) =>
  //           x.role === 'assistant' &&
  //           x.tool_calls?.some((y) => y.type === 'function' && y.id === message.tool_call_id),
  //       )
  //     ) {
  //       return message.content;
  //     }
  //   }

  //   return;
  // }

  // async finalFunctionCallResult(): Promise<string | undefined> {
  //   await this.done();
  //   return this.#getFinalFunctionCallResult();
  // }

  #calculateTotalUsage(): CompletionUsage {
    const total: CompletionUsage = {
      completion_tokens: 0,
      prompt_tokens: 0,
      total_tokens: 0,
    };
    for (const { usage } of this._chatCompletions) {
      if (usage) {
        total.completion_tokens += usage.completion_tokens;
        total.prompt_tokens += usage.prompt_tokens;
        total.total_tokens += usage.total_tokens;
      }
    }
    return total;
  }

  async totalUsage(): Promise<CompletionUsage> {
    await this.done();
    return this.#calculateTotalUsage();
  }

  getTaskId(): string | null {
    return this.task_id;
  }

  allChatCompletions(): ChatCompletion[] {
    return [...this._chatCompletions];
  }

  #handleError = (error: unknown) => {
    this.#errored = true;
    if (error instanceof Error && error.name === 'AbortError') {
      error = new APIUserAbortError();
    }
    if (error instanceof APIUserAbortError) {
      this.#aborted = true;
      return this._emit('abort', error);
    }
    if (error instanceof PropulsionAIError) {
      return this._emit('error', error);
    }
    if (error instanceof Error) {
      const propulsionAIError: PropulsionAIError = new PropulsionAIError(error.message);
      // @ts-ignore
      propulsionAIError.cause = error;
      return this._emit('error', propulsionAIError);
    }
    return this._emit('error', new PropulsionAIError(String(error)));
  };

  protected _emit<Event extends keyof Events>(event: Event, ...args: EventParameters<Events, Event>) {
    // make sure we don't emit any events after end
    if (this.#ended) {
      return;
    }

    if (event === 'end') {
      this.#ended = true;
      this.#resolveEndPromise();
    }

    const listeners: ListenersForEvent<Events, Event> | undefined = this.#listeners[event];
    if (listeners) {
      this.#listeners[event] = listeners.filter((l) => !l.once) as any;
      listeners.forEach(({ listener }: any) => listener(...args));
    }

    if (event === 'abort') {
      const error = args[0] as APIUserAbortError;
      if (!this.#catchingPromiseCreated && !listeners?.length) {
        Promise.reject(error);
      }
      this.#rejectConnectedPromise(error);
      this.#rejectEndPromise(error);
      this._emit('end');
      return;
    }

    if (event === 'error') {
      // NOTE: _emit('error', error) should only be called from #handleError().

      const error = args[0] as PropulsionAIError;
      if (!this.#catchingPromiseCreated && !listeners?.length) {
        // Trigger an unhandled rejection if the user hasn't registered any error handlers.
        // If you are seeing stack traces here, make sure to handle errors via either:
        // - runner.on('error', () => ...)
        // - await runner.done()
        // - await runner.finalChatCompletion()
        // - etc.
        Promise.reject(error);
      }
      this.#rejectConnectedPromise(error);
      this.#rejectEndPromise(error);
      this._emit('end');
    }
  }

  protected _emitFinal() {
    const completion = this._chatCompletions[this._chatCompletions.length - 1];
    if (completion) this._emit('finalChatCompletion', completion);
    const finalMessage = this.#getFinalMessage();
    if (finalMessage) this._emit('finalMessage', finalMessage);
    const finalContent = this.#getFinalContent();
    if (finalContent) this._emit('finalContent', finalContent);

    // const finalFunctionCall = this.#getFinalFunctionCall();
    // if (finalFunctionCall) this._emit('finalFunctionCall', finalFunctionCall);

    // const finalFunctionCallResult = this.#getFinalFunctionCallResult();
    // if (finalFunctionCallResult != null) this._emit('finalFunctionCallResult', finalFunctionCallResult);

    if (this._chatCompletions.some((c) => c.usage)) {
      this._emit('totalUsage', this.#calculateTotalUsage());
    }
  }

  #validateParams(params: ChatCompletionCreateParams): void {
    if (params.n != null && params.n > 1) {
      throw new PropulsionAIError(
        'ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.',
      );
    }
  }

  protected async _createChatCompletion(
    completions: Completions,
    params: ChatCompletionCreateParams,
    options?: Core.RequestOptions,
  ): Promise<ChatCompletion> {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted) this.controller.abort();
      signal.addEventListener('abort', () => this.controller.abort());
    }
    this.#validateParams(params);
    const chatCompletion = await completions.create(
      { ...params, stream: false },
      { ...options, signal: this.controller.signal },
    );
    this._connected();
    if (chatCompletion.task_id) {
      this._set_task_id(chatCompletion.task_id);
    }
    return this._addChatCompletion(chatCompletion);
  }

  protected async _runChatCompletion(
    completions: Completions,
    params: ChatCompletionCreateParams,
    options?: Core.RequestOptions,
  ): Promise<ChatCompletion> {
    for (const message of params.messages) {
      this._addMessage(message, false);
    }
    return await this._createChatCompletion(completions, params, options);
  }

  protected async _runTools<FunctionsArgs extends BaseFunctionsArgs>(
    completions: Completions,
    params:
      | ChatCompletionToolRunnerParams<FunctionsArgs>
      | ChatCompletionStreamingToolRunnerParams<FunctionsArgs>,
    options?: RunnerOptions,
  ) {
    const role = 'tool' as const;
    const { tool_choice = 'auto', stream, ...restParams } = params;
    const singleFunctionToCall = typeof tool_choice !== 'string' && tool_choice?.function?.name;
    const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};

    const functionsByName: Record<string, RunnableFunction<any>> = {};
    for (const f of params.tools) {
      if (f.type === 'function') {
        functionsByName[f.function.name || f.function.function.name] = f.function;
      }
    }

    const tools: ChatCompletionTool[] =
      'tools' in params ?
        params.tools.map((t) =>
          t.type === 'function' ?
            {
              type: 'function',
              function: {
                name: t.function.name || t.function.function.name,
                parameters: t.function.parameters as Record<string, unknown>,
                description: t.function.description,
              },
            }
          : (t as unknown as ChatCompletionTool),
        )
      : (undefined as any);

    for (const message of params.messages) {
      this._addMessage(message, false);
    }

    for (let i = 0; i < maxChatCompletions; ++i) {
      const chatCompletion: ChatCompletion = await this._createChatCompletion(
        completions,
        {
          ...restParams,
          task_id: this.task_id,
          tool_choice,
          tools,
          messages: [...this.messages],
        },
        options,
      );
      const message = chatCompletion.choices[0]?.message;
      if (!message) {
        throw new PropulsionAIError(`missing message in ChatCompletion response`);
      }
      if (!message.tool_calls) {
        return;
      }
      if (message.tool_calls.length === 0) {
        return;
      }
      for (const tool_call of message.tool_calls) {
        if (!tool_call.type) tool_call.type = 'function';
        if (tool_call.type !== 'function') continue;
        const tool_call_id = tool_call.id;
        let f = tool_call.function;
        if (!f) continue;
        const { name, arguments: args } = f;
        const fn = functionsByName[name];

        if (!fn) {
          const content = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${tools
            .map((f) => JSON.stringify(f.function.name))
            .join(', ')}. Please try again`;

          this._addMessage({ role, tool_call_id, content });
          continue;
        } else if (singleFunctionToCall && singleFunctionToCall !== name) {
          const content = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(
            singleFunctionToCall,
          )} requested. Please try again`;

          this._addMessage({ role, tool_call_id, content });
          continue;
        }

        let parsed;
        try {
          if(typeof args !== 'string') {
            throw new PropulsionAIError('Invalid arguments');
          }
          console.log("")
          console.log("args",  args, JSON.parse(args));
          console.log(isRunnableFunctionWithParse(fn))
          console.log("")
          parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
          console.log(parsed, "parsed", typeof parsed)
          console.log("")
        } catch (error) {
          const content = error instanceof Error ? error.message : String(error);
          this._addMessage({ role, tool_call_id, content });
          continue;
        }

        // @ts-expect-error it can't rule out `never` type.
        const rawContent = await fn.function(parsed, this);
        console.log(rawContent, "rawContent")
        const content = this.#stringifyFunctionCallResult(rawContent);
        this._addMessage({ role, tool_call_id, content });
        if (singleFunctionToCall) {
          return;
        }
      }
    }

    return;
  }

  #stringifyFunctionCallResult(rawContent: unknown): string {
    return (
      typeof rawContent === 'string' ? rawContent
      : rawContent === undefined ? 'undefined'
      : JSON.stringify(rawContent)
    );
  }
}

type CustomEvents<Event extends string> = {
  [k in Event]: k extends keyof AbstractChatCompletionRunnerEvents ? AbstractChatCompletionRunnerEvents[k]
  : (...args: any[]) => void;
};

type ListenerForEvent<Events extends CustomEvents<any>, Event extends keyof Events> = Event extends (
  keyof AbstractChatCompletionRunnerEvents
) ?
  AbstractChatCompletionRunnerEvents[Event]
: Events[Event];

type ListenersForEvent<Events extends CustomEvents<any>, Event extends keyof Events> = Array<{
  listener: ListenerForEvent<Events, Event>;
  once?: boolean;
}>;
type EventParameters<Events extends CustomEvents<any>, Event extends keyof Events> = Parameters<
  ListenerForEvent<Events, Event>
>;

export interface AbstractChatCompletionRunnerEvents {
  connect: () => void;
  task_id: (task_id: string) => void;
  message: (message: ChatCompletionMessageParam) => void;
  chatCompletion: (completion: ChatCompletion) => void;
  finalContent: (contentSnapshot: string) => void;
  finalMessage: (message: ChatCompletionMessageParam) => void;
  finalChatCompletion: (completion: ChatCompletion) => void;
  functionCallResult: (content: string) => void;
  finalFunctionCallResult: (content: string) => void;
  error: (error: PropulsionAIError) => void;
  abort: (error: APIUserAbortError) => void;
  end: () => void;
  totalUsage: (usage: CompletionUsage) => void;
}
