// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PropulsionAI from 'propulsionai';
import { Response } from 'node-fetch';

const propulsionAI = new PropulsionAI({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource record', () => {
  test('create: only required params', async () => {
    const responsePromise = propulsionAI.dataset.record.create({ data: {}, dataset_id: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await propulsionAI.dataset.record.create({
      data: {
        query: 'query',
        tools: [
          {
            type: 'function',
            function: { description: 'description', name: 'name', parameters: { foo: 'bar' } },
          },
          {
            type: 'function',
            function: { description: 'description', name: 'name', parameters: { foo: 'bar' } },
          },
          {
            type: 'function',
            function: { description: 'description', name: 'name', parameters: { foo: 'bar' } },
          },
        ],
        chosen: 'chosen',
        images: 'images',
        prompt: 'prompt',
        system: 'system',
        history: [
          ['string', 'string', 'string'],
          ['string', 'string', 'string'],
          ['string', 'string', 'string'],
        ],
        kto_tag: 'kto_tag',
        messages: [
          { role: 'system', content: 'content' },
          { role: 'system', content: 'content' },
          { role: 'system', content: 'content' },
        ],
        rejected: 'rejected',
        response: 'response',
      },
      dataset_id: 0,
    });
  });
});
