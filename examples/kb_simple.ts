#!/usr/bin/env -S npm run tsn -T

import Propulsionai from 'propulsionai';

const propulsionai = new Propulsionai({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'], // This is the default and can be omitted
});

async function mongo_query(parameters: any): Promise<any> {
  console.log(parameters);
  return `[{\"name\":\"Revenues\",\"description\":\"Revenues total result\",\"results\":[{\"date\":\"2023-01-01\",\"value\":7437.705499173913}],\"total\":7437.705499173913,\"sub_fields\":[{\"name\":\"Customization Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Other Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Management Fees\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Additional License Fees\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Events Management Retainer\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Onboarding Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Job Materials\",\"results\":[{\"date\":\"2023-01-01\",\"value\":3239.72}],\"total\":3239.72,\"sub_fields\":[{\"name\":\"Fountains and Garden Lighting\",\"results\":[{\"date\":\"2023-01-01\",\"value\":1089}],\"total\":1089},{\"name\":\"Plants and Soil\",\"results\":[{\"date\":\"2023-01-01\",\"value\":2120.72}],\"total\":2120.72},{\"name\":\"Sprinklers and Drip Systems\",\"results\":[{\"date\":\"2023-01-01\",\"value\":30}],\"total\":30}]},{\"name\":\"Labor\",\"results\":[{\"date\":\"2023-01-01\",\"value\":250}],\"total\":250,\"sub_fields\":[{\"name\":\"Installation\",\"results\":[{\"date\":\"2023-01-01\",\"value\":250}],\"total\":250},{\"name\":\"Maintenance and Repair\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0}]},{\"name\":\"Design income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":1987.5}],\"total\":1987.5,\"sub_fields\":[{\"name\":\"BLABLA (deleted)\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0}]},{\"name\":\"Discounts given\",\"results\":[{\"date\":\"2023-01-01\",\"value\":-89.5}],\"total\":-89.5},{\"name\":\"Fountains and Garden Lighting\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Landscaping Services\",\"results\":[{\"date\":\"2023-01-01\",\"value\":680}],\"total\":680},{\"name\":\"Other Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Pest Control Services\",\"results\":[{\"date\":\"2023-01-01\",\"value\":-30}],\"total\":-30},{\"name\":\"Raviraj\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Sales of Product Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":44}],\"total\":44},{\"name\":\"Services\",\"results\":[{\"date\":\"2023-01-01\",\"value\":503.55}],\"total\":503.55},{\"name\":\"Small business income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Unapplied Cash Payment Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Uncategorized Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Revenue stream 2\",\"results\":[{\"date\":\"2023-01-01\",\"value\":130.02526099281025}],\"total\":130.02526099281025},{\"name\":\"Revenue stream 3\",\"results\":[{\"date\":\"2023-01-01\",\"value\":100}],\"total\":100},{\"name\":\"New Sub Field (1)\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Base License Fees\",\"results\":[{\"date\":\"2023-01-01\",\"value\":453.82424098}],\"total\":453.82424098},{\"name\":\"Revenue stream 1\",\"results\":[{\"date\":\"2023-01-01\",\"value\":168.58599720110382}],\"total\":168.58599720110382}]}]`;
}

async function main() {
  console.log('Running the model...');
  const modelRunResponse = await propulsionai.models.epAuto('<deployment_tag>', {
    knowledgebases: ['<knowledgebase_ids>'],
    messages: [
      {
        role: 'user',
        content: 'Can you tell me something about PropulsionAI\'s Astro and Orion?',
      },
    ],
    model: 'auto',
    stream: false,
    wait: true,
  });

  console.log('Model Run ID:', modelRunResponse.id);
  console.log('Task ID:', modelRunResponse.task_id || 'N/A');
  console.log('Choices:', modelRunResponse.choices);
  console.log('Tool Calls:', modelRunResponse.toolCalls);
}

main();
