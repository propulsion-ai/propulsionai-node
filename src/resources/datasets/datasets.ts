// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as TasksAPI from './tasks';

export class Datasets extends APIResource {
  tasks: TasksAPI.Tasks = new TasksAPI.Tasks(this._client);
}

export namespace Datasets {
  export import Tasks = TasksAPI.Tasks;
  export import TaskCreateParams = TasksAPI.TaskCreateParams;
}
