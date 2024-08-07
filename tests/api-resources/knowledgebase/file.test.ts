// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PropulsionAI, { toFile } from 'propulsionai';
import { Response } from 'node-fetch';

const client = new PropulsionAI({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource file', () => {
  test('create: only required params', async () => {
    const responsePromise = client.knowledgebase.file.create('knowledgebase_code', {
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

  test('create: required and optional params', async () => {
    const response = await client.knowledgebase.file.create('knowledgebase_code', {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });

  test('delete', async () => {
    const responsePromise = client.knowledgebase.file.delete('knowledgebase_code', 'file_id');
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
      client.knowledgebase.file.delete('knowledgebase_code', 'file_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PropulsionAI.NotFoundError);
  });

  test('upload: only required params', async () => {
    const responsePromise = client.knowledgebase.file.upload('knowledgebase_code', {
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
    const response = await client.knowledgebase.file.upload('knowledgebase_code', {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });
});
