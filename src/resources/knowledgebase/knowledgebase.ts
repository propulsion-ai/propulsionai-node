// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as KnowledgebaseAPI from './knowledgebase';
import * as FileAPI from './file';

export class KnowledgebaseResource extends APIResource {
  file: FileAPI.FileResource = new FileAPI.FileResource(this._client);

  /**
   * Creates a new knowledgebase.
   */
  create(body: KnowledgebaseCreateParams, options?: Core.RequestOptions): Core.APIPromise<Knowledgebase> {
    return this._client.post('/knowledgebase', { body, ...options });
  }
}

export interface Knowledgebase {
  id?: number;

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
  export import FileDeleteResponse = FileAPI.FileDeleteResponse;
  export import FileUploadParams = FileAPI.FileUploadParams;
}
