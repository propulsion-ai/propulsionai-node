// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as FileAPI from './file';

export class FileResource extends APIResource {
  /**
   * Uploads a file to a knowledgebase.
   */
  create(
    knowledgebaseCode: string,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<File> {
    return this._client.post(
      `/knowledgebase/${knowledgebaseCode}/file`,
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }

  /**
   * Deletes a file from a knowledgebase.
   */
  delete(
    knowledgebaseCode: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/knowledgebase/${knowledgebaseCode}/file/${fileId}`, options);
  }

  /**
   * Uploads a file to a knowledgebase.
   */
  upload(
    knowledgebaseCode: string,
    body: FileUploadParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<File> {
    return this._client.post(
      `/knowledgebase/${knowledgebaseCode}/file`,
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }
}

export interface File {
  id?: string;

  message?: string;
}

export interface KnowledgebaseFileUploadResponse {
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

export interface FileUploadParams {
  file: Core.Uploadable;
}

export namespace FileResource {
  export import File = FileAPI.File;
  export import KnowledgebaseFileUploadResponse = FileAPI.KnowledgebaseFileUploadResponse;
  export import FileDeleteResponse = FileAPI.FileDeleteResponse;
  export import FileCreateParams = FileAPI.FileCreateParams;
  export import FileUploadParams = FileAPI.FileUploadParams;
}
