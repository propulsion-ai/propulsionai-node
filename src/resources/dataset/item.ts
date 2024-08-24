// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ItemAPI from './item';

export class Item extends APIResource {
  /**
   * Creates a new item in a dataset.
   */
  create(body: ItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<ItemCreateResponse> {
    return this._client.post('/dataset/item', { body, ...options });
  }
}

export interface ItemCreateResponse {
  id?: string;

  message?: string;
}

export interface ItemCreateParams {
  data: ItemCreateParams.Data;

  dataset_id: number;
}

export namespace ItemCreateParams {
  export interface Data {
    chosen?: string | null;

    history?: Array<Array<string>> | null;

    images?: string | null;

    kto_tag?: string | null;

    messages?: Array<Data.Message>;

    prompt?: string | null;

    query?: string | null;

    rejected?: string | null;

    response?: string | null;

    system?: string | null;

    tools?: Array<Data.Tool> | null;
  }

  export namespace Data {
    export interface Message {
      content?: string | Array<Message.UnionMember1>;

      role?: 'system' | 'user' | 'assistant' | 'tool';
    }

    export namespace Message {
      export interface UnionMember1 {
        image_url?: UnionMember1.ImageURL;

        text?: string;

        type?: 'text' | 'image_url';
      }

      export namespace UnionMember1 {
        export interface ImageURL {
          url?: string;
        }
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
}

export namespace Item {
  export import ItemCreateResponse = ItemAPI.ItemCreateResponse;
  export import ItemCreateParams = ItemAPI.ItemCreateParams;
}
