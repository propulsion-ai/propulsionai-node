// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PropulsionAI from 'propulsionai';
import { Response } from 'node-fetch';

const client = new PropulsionAI({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource knowledgebase', () => {
  test('create: only required params', async () => {
    const responsePromise = client.knowledgebase.create({ name: 'name', tags: 'tags' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.knowledgebase.create({
      name: 'name',
      tags: 'tags',
      description: 'description',
    });
  });
});
