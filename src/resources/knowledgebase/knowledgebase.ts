// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as KnowledgebaseAPI from './knowledgebase';
import * as FileAPI from './file';
import * as ItemAPI from './item';

export class KnowledgebaseResource extends APIResource {
  file: FileAPI.FileResource = new FileAPI.FileResource(this._client);
  item: ItemAPI.Item = new ItemAPI.Item(this._client);

  /**
   * Creates a new knowledgebase.
   */
  create(body: KnowledgebaseCreateParams, options?: Core.RequestOptions): Core.APIPromise<Knowledgebase> {
    return this._client.post('/knowledgebase', { body, ...options });
  }
}

export interface Knowledgebase {
  code?: string;

  message?: string;
}

export interface KnowledgebaseCreateParams {
  name: string;

  tags: string;

  description?: string;
}

export namespace KnowledgebaseResource {
  export import Knowledgebase = KnowledgebaseAPI.Knowledgebase;
  export import KnowledgebaseCreateParams = KnowledgebaseAPI.KnowledgebaseCreateParams;
  export import FileResource = FileAPI.FileResource;
  export import File = FileAPI.File;
  export import KnowledgebaseFileUploadResponse = FileAPI.KnowledgebaseFileUploadResponse;
  export import FileDeleteResponse = FileAPI.FileDeleteResponse;
  export import FileCreateParams = FileAPI.FileCreateParams;
  export import FileUploadParams = FileAPI.FileUploadParams;
  export import Item = ItemAPI.Item;
  export import KnowledgebaseItemResponse = ItemAPI.KnowledgebaseItemResponse;
  export import ItemCreateParams = ItemAPI.ItemCreateParams;
}
