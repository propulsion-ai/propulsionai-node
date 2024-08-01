import fs from 'fs';
import path from 'path';
import PropulsionAI from 'propulsionai';

const client = new PropulsionAI({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'],
  baseURL: 'https://npapi.propulsionhq.com/api/v2',
});

async function main() {
  const kb = await client.knowledgebase.create({
    name: 'Draft knowledgebase',
    description: 'This is a draft knowledgebase',
    tags: 'draft',
  });

  if (kb.id) {
    console.log(`Knowledgebase created with id: ${kb.id}`);
    // read file as stream
    let file = fs.createReadStream(path.resolve(__dirname, '12025248.pdf'));
    const kb_file = await client.knowledgebase.file.upload(kb.id, {
      file: file,
    });
    console.log(`Knowledgebase file uploaded with id: ${kb_file.id}`);
  }
}

main();
