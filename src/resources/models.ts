// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import * as ModelsAPI from './models';

export class Models extends APIResource {
  /**
   * This endpoint runs a model with the specified tools and messages.
   */
  chat(
    modelId: string,
    params: ModelChatParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelChatResponse> {
    const { wait, ...body } = params;
    return this._client.post(`/api/v1/${modelId}/run`, { query: { wait }, body, ...options });
  }

  /**
   * Run a model with specified tools and messages and automatically call the tools.
   */
  async chatAuto(
    modelId: string,
    params: ModelChatParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIPromise<ModelChatResponse>> {
    const { wait, ...body } = params;
    if (body.tools?.length === 0) {
      return this._client.post(`/api/v1/${modelId}/run`, { query: { wait }, body, ...options });
    } else {
      let inital_response: ModelChatResponse = await this._client.post(`/api/v1/${modelId}/run`, {
        query: { wait },
        body,
        ...options,
      });
      if (inital_response.toolCalls) {
        for (let i in inital_response.toolCalls) {
          const toolCall: any = inital_response.toolCalls[i];
          const uf: any = body.tools?.find((t) => t.function.name === toolCall.function.name)?.function
            .function;
          if (!uf) {
            return inital_response;
          }
          let toolResponse = await uf(toolCall.function.parameters);
          if (!toolResponse) {
            return inital_response;
          }
          body.messages.push({
            content: `Call the function named ${toolCall.function.name} with provided parameters.`,
            role: 'assistant',
          });
          body.messages.push({ content: JSON.stringify(toolResponse), role: 'user' });

          delete body.tool_choice;
          delete body.tools;

          return this._client.post(`/api/v1/${modelId}/run`, { query: { wait }, body, ...options });
        }
      }
      return inital_response;
    }
  }
}

export interface ModelChatResponse {
  id?: string;

  choices?: Array<ModelChatResponse.Choice>;

  created?: number;

  model?: string;

  object?: string;

  toolCalls?: Array<ModelChatResponse.ToolCall>;

  usage?: ModelChatResponse.Usage;
}

export namespace ModelChatResponse {
  export interface Choice {
    index?: number;

    message?: Choice.Message;
  }

  export namespace Choice {
    export interface Message {
      content?: string;

      role?: string;
    }
  }

  export interface ToolCall {
    function?: ToolCall.Function;

    type?: 'function';
  }

  export namespace ToolCall {
    export interface Function {
      /**
       * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
       * underscores and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the function does, used by the model to choose when and
       * how to call the function.
       */
      description?: string;

      /**
       * The parameters the functions accepts, described as a JSON Schema object. See the
       * [guide](/docs/guides/function-calling) for examples, and the
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       *
       * Omitting `parameters` defines a function with an empty parameter list.
       */
      parameters?: Record<string, unknown>;
      [k: string]: unknown;
    }
  }

  export interface Usage {
    completion_tokens?: number;

    prompt_tokens?: number;

    total_tokens?: number;
  }
}

export interface ModelChatParams {
  /**
   * Body param:
   */
  messages: Array<ModelChatParams.Message>;

  /**
   * Body param:
   */
  model: string;

  /**
   * Body param:
   */
  stream: boolean;

  /**
   * Query param: Whether to wait for the response or not.
   */
  wait?: boolean;

  /**
   * Body param: The maximum number of [tokens](/tokenizer) that can be generated in
   * the chat completion.
   *
   * The total length of input tokens and generated tokens is limited by the model's
   * context length.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)
   * for counting tokens.
   */
  max_tokens?: number | null;

  /**
   * Body param: How many chat completion choices to generate for each input message.
   * Note that you will be charged based on the number of generated tokens across all
   * of the choices. Keep `n` as `1` to minimize costs.
   */
  n?: number | null;

  /**
   * Body param: An alternative to sampling with temperature, called nucleus
   * sampling, where the model considers the results of the tokens with top_p
   * probability mass. So 0.1 means only the tokens comprising the top 10%
   * probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  temperature?: number | null;

  /**
   * Body param: Controls which (if any) tool is called by the model. `none` means
   * the model will not call any tool and instead generates a message. `auto` means
   * the model can pick between generating a message or calling one or more tools.
   * `required` means the model must call one or more tools. Specifying a particular
   * tool via `{"type": "function", "function": {"name": "my_function"}}` forces the
   * model to call that tool.
   *
   * `none` is the default when no tools are present. `auto` is the default if tools
   * are present.
   */
  tool_choice?: 'none' | 'auto' | 'required' | ModelChatParams.ChatCompletionNamedToolChoice;

  /**
   * Body param: A list of tools the model may call. Currently, only functions are
   * supported as a tool. Use this to provide a list of functions the model may
   * generate JSON inputs for. A max of 128 functions are supported.
   */
  tools?: Array<ModelChatParams.Tool>;

  /**
   * Body param: An alternative to sampling with temperature, called nucleus
   * sampling, where the model considers the results of the tokens with top_p
   * probability mass. So 0.1 means only the tokens comprising the top 10%
   * probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  top_p?: number | null;
}

export namespace ModelChatParams {
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
      /**
       * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
       * underscores and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the function does, used by the model to choose when and
       * how to call the function.
       */
      description?: string;

      /**
       * The parameters the functions accepts, described as a JSON Schema object. See the
       * [guide](/docs/guides/function-calling) for examples, and the
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       *
       * Omitting `parameters` defines a function with an empty parameter list.
       */
      parameters?: Record<string, unknown>;
      [k: string]: unknown;
    }
  }

  export interface Tool {
    function: Tool.Function;

    /**
     * The type of the tool. Currently, only `function` is supported.
     */
    type: 'function';
  }

  export namespace Tool {
    export interface Function {
      /**
       * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
       * underscores and dashes, with a maximum length of 64.
       */
      name: string;

      /**
       * A description of what the function does, used by the model to choose when and
       * how to call the function.
       */
      description?: string;

      /**
       * The parameters the functions accepts, described as a JSON Schema object. See the
       * [guide](/docs/guides/function-calling) for examples, and the
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       *
       * Omitting `parameters` defines a function with an empty parameter list.
       */
      parameters?: Record<string, unknown>;

      /**
       * The function to be called. Must be a valid JavaScript function.
       */
      function?: (parameters: any) => any;
    }
  }
}

export namespace Models {
  export import ModelChatResponse = ModelsAPI.ModelChatResponse;
  export import ModelChatParams = ModelsAPI.ModelChatParams;
}
