#!/usr/bin/env -S npm run tsn -T

import Propulsionai from 'propulsionai';

const propulsionai = new Propulsionai({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'], // This is the default and can be omitted
});


async function main() {
  console.log('Running the model...');
  const response: any = await propulsionai.models.epAuto('d-ntnq', {
    messages: [
      {
        role: 'user',
        content: 'What is 2 + 988283',
      },
    ],
    model: 'd-ntnq',
    stream: false,
    wait: true,
  });
  console.log('Model Run ID:', response.id);
  console.log('Task ID:', response.task_id);
  console.log('Choices:', response.choices);
  

  const stream: any = await propulsionai.models.ep('d-ntnq', {
    messages: [
      {
        role: 'user',
        content: 'What is 2 + 988283',
      },
    ],
    model: 'd-ntnq',
    stream: true,
    wait: true,
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
}

main();
