import PropulsionAI from 'propulsionai';

const client = new PropulsionAI({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'],
});

async function main() {
  const completionCreateResponse = await client.chat.completions.create({
    deployment: '<deployment-id>',
    messages: [{ role: 'user', content: 'Hello, How are you?' }],
  });

  console.log(completionCreateResponse.choices);

  const stream = await client.chat.completions.create({
    deployment: '<deployment-id>',
    stream: true,
    messages: [{ role: 'user', content: 'Hello, How are you?' }],
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
}

main();
