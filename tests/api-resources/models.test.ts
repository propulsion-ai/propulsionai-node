// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PropulsionAI from 'propulsionai';
import { Response } from 'node-fetch';

const propulsionAI = new PropulsionAI({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource models', () => {
  test('chat: only required params', async () => {
    const responsePromise = propulsionAI.models.chat('string', {
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

  test('chat: required and optional params', async () => {
    const response = await propulsionAI.models.chat('string', {
      messages: [
        { role: 'system', content: 'string' },
        { role: 'system', content: 'string' },
        { role: 'system', content: 'string' },
      ],
      model: 'string',
      stream: true,
      wait: true,
      knowledgebases: ['string', 'string', 'string'],
      max_tokens: 0,
      n: 1,
      task_id: 'string',
      temperature: 0,
      tool_choice: 'none',
      tools: [
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
      ],
      top_p: 0,
    });
  });

  test('ep: only required params', async () => {
    const responsePromise = propulsionAI.models.ep('string', {
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

  test('ep: required and optional params', async () => {
    const response = await propulsionAI.models.ep('string', {
      messages: [
        { role: 'system', content: 'string' },
        { role: 'system', content: 'string' },
        { role: 'system', content: 'string' },
      ],
      model: 'string',
      stream: true,
      wait: true,
      knowledgebases: ['string', 'string', 'string'],
      max_tokens: 0,
      n: 1,
      task_id: 'string',
      temperature: 0,
      tool_choice: 'none',
      tools: [
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
        { type: 'function', function: { description: 'string', name: 'string', parameters: { foo: 'bar' } } },
      ],
      top_p: 0,
    });
  });
});
