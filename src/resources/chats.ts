// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ChatsAPI from './chats';

export class Chats extends APIResource {
  /**
   * Call a deployment endpoint with specified tools and messages.
   */
  create(body: ChatCreateParams, options?: Core.RequestOptions): Core.APIPromise<ChatCreateResponse> {
    return this._client.post('/chat', { body, ...options });
  }
}

export interface ChatCreateResponse {
  id?: string;

  choices?: Array<ChatCreateResponse.Choice>;

  created?: number;

  model?: string;

  object?: string;

  tool_calls?: Array<ChatCreateResponse.ToolCall>;

  usage?: ChatCreateResponse.Usage;
}

export namespace ChatCreateResponse {
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

export interface ChatCreateParams {
  deployment: string;

  messages: Array<ChatCreateParams.Message>;

  knowledgebases?: Array<string>;

  max_tokens?: number;

  n?: number;

  stream?: boolean;

  task_id?: string;

  temperature?: number;

  tool_choice?: 'none' | 'auto' | 'required' | ChatCreateParams.ChatCompletionNamedToolChoice;

  tools?: Array<ChatCreateParams.Tool>;

  /**
   * Probability threshold for token selection in text generation, controlling output
   * randomness.
   */
  top_p?: number;
}

export namespace ChatCreateParams {
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

export namespace Chats {
  export import ChatCreateResponse = ChatsAPI.ChatCreateResponse;
  export import ChatCreateParams = ChatsAPI.ChatCreateParams;
}
