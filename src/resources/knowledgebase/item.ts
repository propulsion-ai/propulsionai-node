// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ItemAPI from './item';

export class Item extends APIResource {
  /**
   * Upload content to a knowledgebase.
   */
  create(
    knowledgebaseCode: string,
    body: ItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<KnowledgebaseItemResponse> {
    return this._client.post(`/knowledgebase/${knowledgebaseCode}/item`, { body, ...options });
  }
}

export interface KnowledgebaseItemResponse {
  id?: string;

  message?: string;
}

export interface ItemCreateParams {
  /**
   * The content that you want to upload to the knowledgebase.
   */
  content: string;

  /**
   * You should use this field to specify the source of the content like url,
   * filename, etc. This will be used for citation purposes.
   */
  source: string;

  /**
   * You can use this field to specify any metadata associated with the content.
   */
  metadata?: unknown;
}

export namespace Item {
  export import KnowledgebaseItemResponse = ItemAPI.KnowledgebaseItemResponse;
  export import ItemCreateParams = ItemAPI.ItemCreateParams;
}
