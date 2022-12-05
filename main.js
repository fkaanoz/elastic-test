import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
});

async function run() {
  await client.indices.create({
    index: "posts",
    mappings: {
      properties: {
        title: {
          type: "text",
          index: true,
        },
        body: {
          type: "text",
          index: true,
        },
        writer: {
          type: "text",
          index: true,
        },
      },
    },
  });
}

run();
