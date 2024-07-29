import PropulsionAI from 'propulsionai';

const client = new PropulsionAI({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'],
  baseURL: "https://npapi.propulsionhq.com/api/v2"
});

async function main() {
  const response = await client.dataset.create({
    name: 'Draft dataset',
  });
  if (response.id) {
    const item = await client.dataset.item.create({
      dataset_id: response.id,
      data: {
        "messages": [
          {
            "role": "system",
            "content": ""
          },
          {
            "role": "user",
            "content": "Hello!"
          },
          {
            "role": "assistant",
            "content": "Hi! How can I assist you today? Do you have any questions or tasks you'd like help with?"
          }
        ],
      },
    });
    console.log(`Dataset item created with id: ${item.id}`);
  }

}

main();
