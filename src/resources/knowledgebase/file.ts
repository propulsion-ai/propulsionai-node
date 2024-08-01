// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as FileAPI from './file';

export class FileResource extends APIResource {}

export interface File {
  id?: string;

  message?: string;
}

export namespace FileResource {
  export import File = FileAPI.File;
}
