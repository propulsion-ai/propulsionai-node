import {
  type Completions,
  type CompletionCreateParamsNonStreaming,
  type CompletionCreateParamsBase,
} from "../resources/chat/completions";
import { type RunnableFunctions, type BaseFunctionsArgs, RunnableTools } from './RunnableFunction';
import {
  AbstractChatCompletionRunner,
  AbstractChatCompletionRunnerEvents,
  RunnerOptions,
} from './AbstractChatCompletionRunner';
import { isAssistantMessage } from './chatCompletionUtils';


/**
 * A chat completion message generated by the model.
 */
export interface ChatCompletionMessage {
  /**
   * The contents of the message.
   */
  content: string | null;

  /**
   * The role of the author of this message.
   */
  role: 'assistant';

  /**
   * The tool calls generated by the model, such as function calls.
   */
  tool_calls?: Array<CompletionCreateParamsBase.Tool>;
}

export namespace ChatCompletionMessage {
  /**
   * @deprecated: Deprecated and replaced by `tool_calls`. The name and arguments of
   * a function that should be called, as generated by the model.
   */
  export interface FunctionCall {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments: string;

    /**
     * The name of the function to call.
     */
    name: string;
  }
}

export interface ChatCompletionRunnerEvents extends AbstractChatCompletionRunnerEvents {
  content: (content: string) => void;
}

export type ChatCompletionFunctionRunnerParams<FunctionsArgs extends BaseFunctionsArgs> = Omit<
  CompletionCreateParamsNonStreaming,
  'functions'
> & {
  functions: RunnableFunctions<FunctionsArgs>;
};

export type ChatCompletionToolRunnerParams<FunctionsArgs extends BaseFunctionsArgs> = Omit<
  CompletionCreateParamsNonStreaming,
  'tools'
> & {
  tools: RunnableTools<FunctionsArgs>;
};

export class ChatCompletionRunner extends AbstractChatCompletionRunner<ChatCompletionRunnerEvents> {
  static runTools(
    completions: Completions,
    params: ChatCompletionToolRunnerParams<any[]>,
    options?: RunnerOptions,
  ): ChatCompletionRunner {
    const runner = new ChatCompletionRunner();
    const opts = {
      ...options,
      headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'runTools' },
    };
    runner._run(() => runner._runTools(completions, params, opts));
    return runner;
  }

  override _addMessage(message: CompletionCreateParamsBase.Message) {
    super._addMessage(message);
    if (isAssistantMessage(message) && message.content) {
      this._emit('content', message.content as string);
    }
  }
  override _set_task_id(task_id: string) {
    if(super.getTaskId() !== task_id) {
      super._set_task_id(task_id);
      this._emit('task_id', task_id as string);
    }
  }
}
