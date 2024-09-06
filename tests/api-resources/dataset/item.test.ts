// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PropulsionAI from 'propulsionai';
import { Response } from 'node-fetch';

const client = new PropulsionAI({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource item', () => {
  test('create: only required params', async () => {
    const responsePromise = client.dataset.item.create({ data: {}, dataset_id: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.dataset.item.create({
      data: {
        chosen: 'chosen',
        history: [
          ['string', 'string', 'string'],
          ['string', 'string', 'string'],
          ['string', 'string', 'string'],
        ],
        images: 'images',
        kto_tag: 'kto_tag',
        messages: [
          { content: 'string', role: 'system' },
          { content: 'string', role: 'system' },
          { content: 'string', role: 'system' },
        ],
        prompt: 'prompt',
        query: 'query',
        rejected: 'rejected',
        response: 'response',
        system: 'system',
        tools: [
          {
            function: { name: 'name', description: 'description', parameters: { foo: 'bar' } },
            type: 'function',
          },
          {
            function: { name: 'name', description: 'description', parameters: { foo: 'bar' } },
            type: 'function',
          },
          {
            function: { name: 'name', description: 'description', parameters: { foo: 'bar' } },
            type: 'function',
          },
        ],
      },
      dataset_id: 0,
    });
  });
});
