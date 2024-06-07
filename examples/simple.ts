#!/usr/bin/env -S npm run tsn -T

import Propulsionai from 'propulsionai';

const propulsionai = new Propulsionai({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'], // This is the default and can be omitted
});

async function mongo_query(parameters: any){

}

async function main() {
  const modelRunResponse = await propulsionai.models.chat('khzhgybzctm6e8m', {
    tools: [{
      type: 'function',
      function: {
        name: 'mongo_query',
        description: 'Write a MongoDB for aggregating data.',
        function: mongo_query,
        parameters: {
          collection: {
            type: "string",
            description: "Name of the collection to query",
          },
          aggregate: {
            type: "array",
            description: "Array of aggregation stages",
          }
        }
      }
    }],
    tool_choice: 'auto',
    messages: [
      {
        "role": "system",
        "content": `
            You are a helpful coder - MongoDB Expert
            here is the transaction collection schema:
            {
              _id: ObjectId,
              user_id: ObjectId,
              amount: Number,
              date: Date
              type: Enum('sales', 'refund', 'chargeback', 'dispute')
            }
            My user_id is '60b9b3b3e4b0b3b3b3b3b3b3'
        `
      },
      {
        "role": "user",
        "content": "What are my total sales for 2022"
      }
    ],
    model: 'khzhgybzctm6e8m',
    stream: false,
    wait: true,
  });

  console.log(modelRunResponse.id);
  console.log(modelRunResponse.choices);
  console.log(modelRunResponse.toolCalls);
  
  if(modelRunResponse.toolCalls){
    modelRunResponse.toolCalls.forEach((toolCall: any) => {
      console.log(JSON.stringify(toolCall));
    });
  }
}

main();