// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Propulsionai from 'propulsionai';
import { Response } from 'node-fetch';

const propulsionai = new Propulsionai({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = propulsionai.chat.completions.create({
      deployment: 'deployment',
      messages: [{}, {}, {}],
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
    const response = await propulsionai.chat.completions.create({
      deployment: 'deployment',
      messages: [
        { role: 'system', content: 'content' },
        { role: 'system', content: 'content' },
        { role: 'system', content: 'content' },
      ],
      knowledgebases: ['string', 'string', 'string'],
      max_tokens: 0,
      n: 1,
      stream: true,
      task_id: 'task_id',
      temperature: 0,
      tool_choice: 'none',
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
      top_p: 0,
    });
  });
});
