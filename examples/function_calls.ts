import PropulsionAI from 'propulsionai';

const client = new PropulsionAI({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'],
});

const tools: Array<PropulsionAI.Chat.Completions.CompletionCreateParamsBase.Tool> = [
  {
    type: 'function',
    function: {
      name: 'generate_password',
      description: 'Generate a random password',
      parameters: {
        type: 'object',
        properties: {
          length: {
            type: 'integer',
            description: 'The length of the password',
          },
          include_symbols: {
            type: 'boolean',
            description: 'Whether to include symbols in the password',
          },
        },
        required: ['length'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_task',
      description: 'Create a new task in a task management system',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The title of the task',
          },
          due_date: {
            type: 'string',
            format: 'date',
            description: 'The due date of the task',
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            description: 'The priority of the task',
          },
        },
        required: ['title', 'due_date', 'priority'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_current_weather',
      description: 'Get the current weather',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city and state, e.g. San Francisco, CA',
          },
          format: {
            type: 'string',
            enum: ['celsius', 'fahrenheit'],
            description: 'The temperature unit to use. Infer this from the users location.',
          },
        },
        required: ['location', 'format'],
      },
    },
  },
];

async function main() {
  const completionCreateResponse = await client.chat.completions.create({
    deployment: '<deployment-id>',
    messages: [
      {
        role: 'user',
        content: 'What is the weather in SF and Delhi?',
      },
    ],
    tools: tools,
    stream: true, // If stream is true and tools are provided, then stream is forced to be false
  });

  if (!completionCreateResponse) {
    console.log('No response');
    return;
  }
  if (!completionCreateResponse.choices) {
    console.log('No choices');
    return;
  }
  if (completionCreateResponse.choices?.length === 0) {
    console.log('No choices');
    return;
  }

  completionCreateResponse.choices.forEach((element) => {
    console.log(`Content: ${element.message?.content}`);
    for (const toolCall of element.message?.tool_calls || []) {
      console.log(`Tool call: ${toolCall.function?.name}`);
      console.log(`Tool call: ${toolCall.function?.arguments}`);
      console.log(toolCall.function);
    }
  });
}

main();
