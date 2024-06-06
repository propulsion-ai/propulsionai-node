// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Propulsionai from 'propulsionai';
import { Response } from 'node-fetch';

const propulsionai = new Propulsionai({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource models', () => {
  test('run: only required params', async () => {
    const responsePromise = propulsionai.models.run('string', {
      messages: [{}, {}, {}],
      model: 'string',
      stream: true,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('run: required and optional params', async () => {
    const response = await propulsionai.models.run('string', {
      messages: [
        { role: 'system', content: 'string' },
        { role: 'system', content: 'string' },
        { role: 'system', content: 'string' },
      ],
      model: 'string',
      stream: true,
      wait: true,
      max_tokens: 0,
      n: 1,
      temperature: 1,
      tool_choice: 'none',
      tools: [
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
      ],
      top_p: 1,
    });
  });
});
