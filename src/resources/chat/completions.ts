// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../../streaming';
import { ChatCompletionRunner, ChatCompletionFunctionRunnerParams } from '../../lib/ChatCompletionRunner';
export { ChatCompletionRunner, ChatCompletionFunctionRunnerParams } from '../../lib/ChatCompletionRunner';
import {
  ChatCompletionStreamingRunner,
  ChatCompletionStreamingToolRunnerParams,
} from '../../lib/ChatCompletionStreamingRunner';
export {
  ChatCompletionStreamingRunner,
  ChatCompletionStreamingFunctionRunnerParams,
} from '../../lib/ChatCompletionStreamingRunner';
import { BaseFunctionsArgs } from '../../lib/RunnableFunction';
export {
  RunnableFunction,
  RunnableFunctions,
  RunnableFunctionWithParse,
  RunnableFunctionWithoutParse,
  ParsingFunction,
  ParsingToolFunction,
} from '../../lib/RunnableFunction';
import { ChatCompletionToolRunnerParams } from '../../lib/ChatCompletionRunner';
export { ChatCompletionToolRunnerParams } from '../../lib/ChatCompletionRunner';
// import { ChatCompletionStreamingToolRunnerParams } from '../../lib/ChatCompletionStreamingRunner';
// export { ChatCompletionStreamingToolRunnerParams } from '../../lib/ChatCompletionStreamingRunner';
// import { ChatCompletionStream, type ChatCompletionStreamParams } from '../../lib/ChatCompletionStream';
// export { ChatCompletionStream, type ChatCompletionStreamParams } from '../../lib/ChatCompletionStream';

export class Completions extends APIResource {
  /**
   * Call a deployment endpoint with specified tools and messages.
   */
  create(
    body: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse>;
  create(
    body: CompletionCreateParamsStreamingNullTools,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Stream<ChatCompletionChunk>>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Stream<ChatCompletionChunk>>;
  create(
    body: CompletionCreateParamsForcedNonStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse>;
  // create(body: CompletionCreateParams, options?: Core.RequestOptions): Core.APIPromise<ChatCompletionChunk>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse> | Core.APIPromise<Stream<ChatCompletionChunk>> {
    return this._client.post('/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | Core.APIPromise<CompletionCreateResponse>
      | Core.APIPromise<Stream<ChatCompletionChunk>>;
  }

  /**
   * A convenience helper for using tool calls with the /chat/completions endpoint
   * which automatically calls the JavaScript functions you provide and sends their
   * results back to the /chat/completions endpoint, looping as long as the model
   * requests function calls.
   */
  runTools<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionToolRunnerParams<FunctionsArgs>,
    options?: Core.RequestOptions,
  ): ChatCompletionRunner;
  runTools<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionStreamingToolRunnerParams<FunctionsArgs>,
    options?: Core.RequestOptions,
  ): ChatCompletionStreamingRunner;
  runTools<FunctionsArgs extends BaseFunctionsArgs>(
    body:
      | ChatCompletionToolRunnerParams<FunctionsArgs>
      | ChatCompletionStreamingToolRunnerParams<FunctionsArgs>,
    options?: Core.RequestOptions,
  ): ChatCompletionRunner | ChatCompletionStreamingRunner {
    if (body.stream) {
      return ChatCompletionStreamingRunner.runTools(
        this._client.chat.completions,
        body as ChatCompletionStreamingToolRunnerParams<FunctionsArgs>,
        options,
      );
    }
    return ChatCompletionRunner.runTools(
      this._client.chat.completions,
      body as ChatCompletionToolRunnerParams<FunctionsArgs>,
      options,
    );
  }

  /**
   * Creates a chat completion stream
   */
  // stream(body: ChatCompletionStreamParams, options?: Core.RequestOptions): ChatCompletionStream {
  //   return ChatCompletionStream.createChatCompletion(this._client.chat.completions, body, options);
  // }
}

export interface CompletionCreateResponse {
  id?: string;

  choices: Array<CompletionCreateResponse.Choice>;

  created?: number;

  model?: string;

  object?: string;

  task_id?: string;

  usage?: CompletionCreateResponse.Usage;

  poll_id?: string;
}

export namespace CompletionCreateResponse {
  export interface Choice {
    index?: number;

    message?: Choice.Message;

    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, `tool_calls` if the
     * model called a tool, or `function_call` (deprecated) if the model called a
     * function.
     */
    finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter';
  }

  export namespace Choice {
    export interface Message {
      content: string | null;

      role: 'system' | 'user' | 'assistant' | 'tool';

      tool_calls: Array<Message.ToolCall>;
    }

    export namespace Message {
      export interface ToolCall {
        id: string;

        function: ToolCall.Function;

        type: 'function';
      }

      export namespace ToolCall {
        export interface Function {
          name: string;

          description?: string;

          arguments: string;
        }
      }
    }
  }

  export interface Usage {
    completion_tokens: number;

    prompt_tokens: number;

    total_tokens: number;
  }
}

/**
 * Represents a streamed chunk of a chat completion response returned by model,
 * based on the provided input.
 */
export interface ChatCompletionChunk {
  /**
   * A unique identifier for the chat completion. Each chunk has the same ID.
   */
  id: string;

  /**
   * A list of chat completion choices. Can contain more than one elements if `n` is
   * greater than 1. Can also be empty for the last chunk if you set
   * `stream_options: {"include_usage": true}`.
   */
  choices: Array<ChatCompletionChunk.Choice>;

  /**
   * The Unix timestamp (in seconds) of when the chat completion was created. Each
   * chunk has the same timestamp.
   */
  created: number;

  /**
   * The model to generate the completion.
   */
  model: string;

  /**
   * The object type, which is always `chat.completion.chunk`.
   */
  object: 'chat.completion.chunk';

  /**
   * The service tier used for processing the request. This field is only included if
   * the `service_tier` parameter is specified in the request.
   */
  service_tier?: 'scale' | 'default' | null;

  /**
   * This fingerprint represents the backend configuration that the model runs with.
   * Can be used in conjunction with the `seed` request parameter to understand when
   * backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;

  /**
   * An optional field that will only be present when you set
   * `stream_options: {"include_usage": true}` in your request. When present, it
   * contains a null value except for the last chunk which contains the token usage
   * statistics for the entire request.
   */
  usage?: CompletionCreateResponse.Usage;

  task_id?: string;

  poll_id?: string;
}

export namespace ChatCompletionChunk {
  export interface Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    delta: Choice.Delta;

    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, `tool_calls` if the
     * model called a tool, or `function_call` (deprecated) if the model called a
     * function.
     */
    finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | null;

    /**
     * The index of the choice in the list of choices.
     */
    index: number;
  }

  export namespace Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    export interface Delta {
      /**
       * The contents of the chunk message.
       */
      content?: string | null;

      /**
       * @deprecated: Deprecated and replaced by `tool_calls`. The name and arguments of
       * a function that should be called, as generated by the model.
       */
      function_call?: Delta.FunctionCall;

      /**
       * The role of the author of this message.
       */
      role?: 'system' | 'user' | 'assistant' | 'tool';

      tool_calls?: Array<Delta.ToolCall>;
    }

    export namespace Delta {
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
        arguments?: string;

        /**
         * The name of the function to call.
         */
        name?: string;
      }

      export interface ToolCall {
        index: number;

        /**
         * The ID of the tool call.
         */
        id?: string;

        function?: ToolCall.Function;

        /**
         * The type of the tool. Currently, only `function` is supported.
         */
        type?: 'function';
      }

      export namespace ToolCall {
        export interface Function {
          /**
           * The arguments to call the function with, as generated by the model in JSON
           * format. Note that the model does not always generate valid JSON, and may
           * hallucinate parameters not defined by your function schema. Validate the
           * arguments in your code before calling your function.
           */
          arguments?: string;

          /**
           * The name of the function to call.
           */
          name?: string;
        }
      }
    }
  }
}

export interface CompletionCreateParamsBase {
  deployment: string;

  messages: Array<CompletionCreateParamsBase.Message>;

  knowledgebases?: Array<string>;

  max_tokens?: number;

  n?: number;

  stream?: boolean | null;

  task_id?: string | null;

  temperature?: number;

  tool_choice?: 'none' | 'auto' | 'required' | CompletionCreateParamsBase.ChatCompletionNamedToolChoice;

  tools?: Array<CompletionCreateParamsBase.Tool> | null;

  /**
   * Probability threshold for token selection in text generation, controlling output
   * randomness.
   */
  top_p?: number;
}

export namespace CompletionCreateParamsBase {
  export interface Message {
    content?: string;

    role?: 'system' | 'user' | 'assistant' | 'tool';

    tool_call_id?: string;
  }

  export interface ChatCompletionNamedToolChoice {
    function: ChatCompletionNamedToolChoice.Function;

    type: 'function';
  }

  export namespace ChatCompletionNamedToolChoice {
    export interface Function {
      name: string;

      description?: string;

      parameters?: Record<string, unknown>;
    }
  }

  export interface Tool {
    function: Tool.Function;

    type: 'function';
  }

  export namespace Tool {
    export interface Function {
      name: string;

      description?: string;

      parameters?: Record<string, unknown>;
    }
  }
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  stream?: false | null;
  tools?: Array<CompletionCreateParamsBase.Tool> | null;
}
export interface CompletionCreateParamsStreamingNullTools extends CompletionCreateParamsBase {
  stream: true;
  tools: [];
}
export interface CompletionCreateParamsForcedNonStreaming extends CompletionCreateParamsBase {
  stream: true;
  tools: Array<CompletionCreateParamsBase.Tool>;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  stream: true;
  // tools?: [] | null;
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export namespace Completions {
  export import CompletionCreateResponse = CompletionsAPI.CompletionCreateResponse;
  export import CompletionCreateParamsBase = CompletionsAPI.CompletionCreateParamsBase;
}
