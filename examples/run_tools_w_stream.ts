import PropulsionAI from 'propulsionai';
import { RunnableToolFunction } from 'propulsionai/lib/RunnableFunction';

const client = new PropulsionAI({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'],
});

const custom_parser = (s: string) => {
  console.log('String to parse:', s); // Log the string before parsing
  try {
    const parsed = JSON.parse(s);
    console.log('Parsed object:', parsed); // Log the parsed object
    console.log('Type of parsed object:', typeof parsed); // Log the type of the parsed object
    return parsed; // Return the parsed object
  } catch (e) {
    console.error('Error parsing JSON:', e); // Log any parsing errors
    return s; // Return the original string if there are any errors
  }
};

const tools: RunnableToolFunction<any>[] = [
  {
    type: 'function',
    function: {
      name: 'list',
      description: 'list queries books by genre, and returns a list of names of books',
      parameters: {
        type: 'object',
        properties: {
          genre: { type: 'string', enum: ['mystery', 'nonfiction', 'memoir', 'romance', 'historical'] },
        },
      },
      function: list,
      parse: custom_parser,
    },
  } as RunnableToolFunction<{ genre: string }>,
  {
    type: 'function',
    function: {
      name: 'search',
      description: 'search queries books by their name and returns a list of book names and their ids',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
      function: search,
      parse: custom_parser,
    },
  } as RunnableToolFunction<{ name: string }>,
  {
    type: 'function',
    function: {
      name: 'get',
      description:
        "get returns a book's detailed information based on the id of the book. Note that this does not accept names, and only IDs, which you can get by using search.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      function: get,
      parse: custom_parser,
    },
  } as RunnableToolFunction<{ id: string }>,
];

async function main() {
  const runner = await client.chat.completions
    .runTools({
      deployment: '<deployment_id>',
      stream: true,
      tools,
      messages: [
        {
          role: 'system',
          content:
            'Please use our book database, which you can access using functions to answer the following questions.',
        },
        {
          role: 'user',
          content:
            'I really enjoyed reading Where the Crawdads Sing, could you recommend me a book that is similar and tell me why?',
        },
      ],
    })
    .on('message', (msg) => console.log('msg', msg))
    .on('functionCallResult', (functionCallResult) => console.log('functionCallResult', functionCallResult))
    .on('content', (diff) => process.stdout.write(diff))
    .on('totalUsage', (totalUsage) => console.log('totalUsage', totalUsage))
    .on('task_id', (task_id) => console.log('task_id', task_id));

  const result = await runner.finalChatCompletion();
  console.log();
  console.log('messages');
  console.log(JSON.stringify(runner.messages));

  console.log();
  console.log('final chat completion');
  console.dir(result, { depth: null });
}

const db = [
  {
    id: 'a1',
    name: 'To Kill a Mockingbird',
    genre: 'historical',
    description: `Compassionate, dramatic, and deeply moving, "To Kill A Mockingbird" takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.`,
  },
  {
    id: 'a2',
    name: 'All the Light We Cannot See',
    genre: 'historical',
    description: `In a mining town in Germany, Werner Pfennig, an orphan, grows up with his younger sister, enchanted by a crude radio they find that brings them news and stories from places they have never seen or imagined. Werner becomes an expert at building and fixing these crucial new instruments and is enlisted to use his talent to track down the resistance. Deftly interweaving the lives of Marie-Laure and Werner, Doerr illuminates the ways, against all odds, people try to be good to one another.`,
  },
  {
    id: 'a3',
    name: 'Where the Crawdads Sing',
    genre: 'historical',
    description: `For years, rumors of the “Marsh Girl” haunted Barkley Cove, a quiet fishing village. Kya Clark is barefoot and wild; unfit for polite society. So in late 1969, when the popular Chase Andrews is found dead, locals immediately suspect her.
      But Kya is not what they say. A born naturalist with just one day of school, she takes life's lessons from the land, learning the real ways of the world from the dishonest signals of fireflies. But while she has the skills to live in solitude forever, the time comes when she yearns to be touched and loved. Drawn to two young men from town, who are each intrigued by her wild beauty, Kya opens herself to a new and startling world—until the unthinkable happens.`,
  },
  {
    id: 'a4',
    name: 'The Silent Patient',
    genre: 'mystery',
    description: `Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face and then never speaks another word.`,
  },
  {
    id: 'a5',
    name: 'Educated',
    genre: 'memoir',
    description: `Tara Westover was 17 the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her "head-for-the-hills bag". In the summer she stewed herbs for her mother, a midwife and healer, and in the winter she salvaged in her father's junkyard.`,
  },
  {
    id: 'a6',
    name: 'Becoming',
    genre: 'memoir',
    description: `In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady of the United States of America—the first African American to serve in that role—she helped create the most welcoming and inclusive White House in history, while also establishing herself as a powerful advocate for women and girls in the U.S. and around the world.`,
  },
  {
    id: 'a7',
    name: 'Pride and Prejudice',
    genre: 'romance',
    description: `Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and eventually comes to appreciate the difference between superficial goodness and actual goodness.`,
  },
  {
    id: 'a8',
    name: 'Normal People',
    genre: 'romance',
    description: `Connell and Marianne grow up in the same small town in rural Ireland. The similarities end there; they are from very different worlds. But when they both earn places at Trinity College in Dublin, a connection that has grown between them lasts long into the following years.`,
  },
];

async function list(raw: any) {
  console.log('raw list: ', raw, typeof raw);
  const { genre }: { genre: string } = raw;
  console.log('calling list: ', genre);
  return db.filter((item) => item.genre === genre).map((item) => ({ name: item.name, id: item.id }));
}

async function search(raw: any) {
  console.log('raw search: ', raw, typeof raw);
  const { name }: { name: string } = raw;
  console.log('calling search: ', name);
  return db.filter((item) => item.name.includes(name)).map((item) => ({ name: item.name, id: item.id }));
}

async function get({ id }: { id: string }) {
  console.log('calling get: ', id);
  return db.find((item) => item.id === id);
}

main();
