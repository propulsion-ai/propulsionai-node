// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PropulsionAI, { toFile } from 'propulsionai';
import { Response } from 'node-fetch';

const propulsionAI = new PropulsionAI({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource file', () => {
  test('delete', async () => {
    const responsePromise = propulsionAI.knowledgebase.file.delete(0, 'file_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      propulsionAI.knowledgebase.file.delete(0, 'file_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PropulsionAI.NotFoundError);
  });

  test('upload: only required params', async () => {
    const responsePromise = propulsionAI.knowledgebase.file.upload(0, {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upload: required and optional params', async () => {
    const response = await propulsionAI.knowledgebase.file.upload(0, {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });
});
