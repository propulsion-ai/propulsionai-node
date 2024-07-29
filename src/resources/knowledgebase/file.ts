// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as FileAPI from './file';

export class File extends APIResource {
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

  /**
   * Uploads a file to a knowledgebase.
   */
  upload(
    knowledgebaseId: number,
    body: FileUploadParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileUploadResponse> {
    return this._client.post(
      `/knowledgebase/${knowledgebaseId}/file`,
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }
}

export interface FileDeleteResponse {
  id?: string;

  message?: string;
}

export interface FileUploadResponse {
  id?: string;

  message?: string;
}

export interface FileUploadParams {
  file: Core.Uploadable;
}

export namespace File {
  export import FileDeleteResponse = FileAPI.FileDeleteResponse;
  export import FileUploadResponse = FileAPI.FileUploadResponse;
  export import FileUploadParams = FileAPI.FileUploadParams;
}
