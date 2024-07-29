// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as KnowledgebaseAPI from './knowledgebase';
import * as FileAPI from './file';

export class Knowledgebase extends APIResource {
  file: FileAPI.File = new FileAPI.File(this._client);

  /**
   * Creates a new knowledgebase.
   */
  create(
    body: KnowledgebaseCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<KnowledgebaseCreateResponse> {
    return this._client.post('/knowledgebase', { body, ...options });
  }
}

export interface KnowledgebaseCreateResponse {
  id?: string;

  message?: string;
}

export interface KnowledgebaseCreateParams {
  name: string;

  tags: string;

  description?: string;
}

export namespace Knowledgebase {
  export import KnowledgebaseCreateResponse = KnowledgebaseAPI.KnowledgebaseCreateResponse;
  export import KnowledgebaseCreateParams = KnowledgebaseAPI.KnowledgebaseCreateParams;
  export import File = FileAPI.File;
  export import FileDeleteResponse = FileAPI.FileDeleteResponse;
  export import FileUploadResponse = FileAPI.FileUploadResponse;
  export import FileUploadParams = FileAPI.FileUploadParams;
}
