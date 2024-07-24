// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Call a deployment endpoint with specified tools and messages.
   */
  create(body: CompletionCreateParams, options?: Core.RequestOptions): Core.APIPromise<CompletionCreateResponse>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse> | Core.APIPromise<Stream<CompletionCreateResponse>> {
    return this._client.post('/chat/completions', { body, ...options, stream: body.stream ?? false }) as 
      Core.APIPromise<CompletionCreateResponse> | 
      Core.APIPromise<Stream<CompletionCreateResponse>>;
  }
}

export interface CompletionCreateResponse {
  id?: string;

  choices?: Array<CompletionCreateResponse.Choice>;

  created?: number;

  model?: string;

  object?: string;

  tool_calls?: Array<CompletionCreateResponse.ToolCall>;

  usage?: CompletionCreateResponse.Usage;
}

export namespace CompletionCreateResponse {
  export interface Choice {
    index?: number;

    message?: Choice.Message;
  }

  export namespace Choice {
    export interface Message {
      content?: string;

      role?: 'system' | 'user' | 'assistant' | 'tool';
    }
  }

  export interface ToolCall {
    function?: ToolCall.Function;

    type?: 'function';
  }

  export namespace ToolCall {
    export interface Function {
      name: string;

      description?: string;

      parameters?: Record<string, unknown>;
    }
  }

  export interface Usage {
    completion_tokens?: number;

    prompt_tokens?: number;

    total_tokens?: number;
  }
}

export interface CompletionCreateParams {
  deployment: string;

  messages: Array<CompletionCreateParams.Message>;

  knowledgebases?: Array<string>;

  max_tokens?: number;

  n?: number;

  stream?: boolean;

  task_id?: string;

  temperature?: number;

  tool_choice?: 'none' | 'auto' | 'required' | CompletionCreateParams.ChatCompletionNamedToolChoice;

  tools?: Array<CompletionCreateParams.Tool>;

  /**
   * Probability threshold for token selection in text generation, controlling output
   * randomness.
   */
  top_p?: number;
}

export namespace CompletionCreateParams {
  export interface Message {
    content?: string;

    role?: 'system' | 'user' | 'assistant' | 'tool';
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

export namespace Completions {
  export import CompletionCreateResponse = CompletionsAPI.CompletionCreateResponse;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
