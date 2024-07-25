// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as RecordAPI from './record';

export class Record extends APIResource {
  /**
   * Creates a new record in a dataset.
   */
  create(body: RecordCreateParams, options?: Core.RequestOptions): Core.APIPromise<RecordCreateResponse> {
    return this._client.post('/dataset/record', { body, ...options });
  }
}

export interface RecordCreateResponse {
  message?: string;

  task_id?: string;
}

export interface RecordCreateParams {
  data: RecordCreateParams.Data;

  dataset_id: number;
}

export namespace RecordCreateParams {
  export interface Data {
    chosen?: string | null;

    history?: Array<Array<string>>;

    images?: string | null;

    kto_tag?: string | null;

    messages?: Array<Data.Message>;

    prompt?: string | null;

    query?: string | null;

    rejected?: string | null;

    response?: string | null;

    system?: string | null;

    tools?: Array<Data.Tool>;
  }

  export namespace Data {
    export interface Message {
      content?: string;

      role?: 'system' | 'user' | 'assistant' | 'tool';
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

export namespace Record {
  export import RecordCreateResponse = RecordAPI.RecordCreateResponse;
  export import RecordCreateParams = RecordAPI.RecordCreateParams;
}
