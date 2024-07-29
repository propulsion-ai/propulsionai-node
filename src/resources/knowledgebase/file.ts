// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as FileAPI from './file';

export class File extends APIResource {
  /**
   * Uploads a file to a knowledgebase.
   */
  create(
    knowledgebaseId: number,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileCreateResponse> {
    return this._client.post(
      `/knowledgebase/${knowledgebaseId}/file`,
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }

  /**
   * Deletes a file from a knowledgebase.
   */
  delete(
    knowledgebaseId: number,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/knowledgebase/${knowledgebaseId}/file/${fileId}`, options);
  }
}

export interface FileCreateResponse {
  id?: string;

  message?: string;
}

export interface FileDeleteResponse {
  id?: string;

  message?: string;
}

export interface FileCreateParams {
  file: Core.Uploadable;
}

export namespace File {
  export import FileCreateResponse = FileAPI.FileCreateResponse;
  export import FileDeleteResponse = FileAPI.FileDeleteResponse;
  export import FileCreateParams = FileAPI.FileCreateParams;
}
