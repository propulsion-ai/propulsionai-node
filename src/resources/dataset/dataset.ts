// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as DatasetAPI from './dataset';
import * as ItemAPI from './item';

export class Dataset extends APIResource {
  item: ItemAPI.Item = new ItemAPI.Item(this._client);

  /**
   * Creates a new dataset.
   */
  create(body: DatasetCreateParams, options?: Core.RequestOptions): Core.APIPromise<DatasetCreateResponse> {
    return this._client.post('/dataset', { body, ...options });
  }
}

export interface DatasetCreateResponse {
  dataset?: DatasetCreateResponse.Dataset;

  message?: string;
}

export namespace DatasetCreateResponse {
  export interface Dataset {
    id?: number;

    created?: number;

    description?: string;

    metadata?: Record<string, unknown>;

    name?: string;

    project_id?: number;

    settings?: Record<string, unknown>;

    updated?: number;
  }
}

export interface DatasetCreateParams {
  name: string;

  description?: string;

  metadata?: Record<string, unknown>;

  settings?: Record<string, unknown>;
}

export namespace Dataset {
  export import DatasetCreateResponse = DatasetAPI.DatasetCreateResponse;
  export import DatasetCreateParams = DatasetAPI.DatasetCreateParams;
  export import Item = ItemAPI.Item;
  export import ItemCreateResponse = ItemAPI.ItemCreateResponse;
  export import ItemCreateParams = ItemAPI.ItemCreateParams;
}
