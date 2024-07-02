// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as TasksAPI from './tasks';

export class Tasks extends APIResource {
  /**
   * This endpoint creates a new task for the dataset with specific columns.
   */
  create(datasetId: number, body: TaskCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/api/v1/dataset/${datasetId}/task`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface TaskCreateParams {
  /**
   * The column name in the dataset containing the chosen answers.
   */
  chosen?: string;

  /**
   * The column name in the dataset containing the histories.
   */
  history?: string;

  /**
   * The column name in the dataset containing the image inputs.
   */
  images?: string;

  /**
   * The column name in the dataset containing the kto tags.
   */
  kto_tag?: string;

  /**
   * The column name in the dataset containing the messages.
   */
  messages?: string;

  /**
   * The column name in the dataset containing the prompts.
   */
  prompt?: string;

  /**
   * The column name in the dataset containing the queries.
   */
  query?: string;

  /**
   * The column name in the dataset containing the rejected answers.
   */
  rejected?: string;

  /**
   * The column name in the dataset containing the responses.
   */
  response?: string;

  /**
   * The column name in the dataset containing the system prompts.
   */
  system?: string;

  /**
   * The column name in the dataset containing the tool descriptions.
   */
  tools?: string;
}

export namespace Tasks {
  export import TaskCreateParams = TasksAPI.TaskCreateParams;
}
