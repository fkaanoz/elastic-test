import { Client } from "@elastic/elasticsearch";
import fs from "fs";

const client = new Client({
  node: "http://localhost:9200",
});

console.log("starting");
async function createIndex() {
  await client.indices.create({
    index: "posts_5",
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
console.log("---- create index -----");
createIndex();
console.log("---- create index (f) -----");

let data = [];
let authors = [
  "Helen Adam",
  "James Adam",
  "Jean Adam",
  "Paul Adam",
  "Pip Adam",
  "Ruth Adam",
  "Gabriela Adameșteanu",
  "Draginja Adamović",
  "Ratko Adamović",
  "Andrew Leith Adams",
  "Anna Adams",
  "Arthur Henry Adams",
  "Charles Warren Adams",
  "Douglas Adams",
  "Francis Adams",
  "Glenda Adams",
  "Henry Adams",
  "Jad Adams",
  "Jennie Adams",
  "John Adams",
  "Léonie Adams",
  "Mary Adams",
  "Patch Adams",
  "Patricia J. Adams",
  "Poppy Adams",
  "Richard Adams",
  "Robert Adams",
  "Ryan Adams",
  "William Henry Davenport Adams",
  "Patsy Adam-Smith",
  "Catherine Adamson",
  "Hendrik Adamson",
  "Henry Adamson",
  "Jean Adamson",
  "John Adamson",
  "Joy Adamson",
  "Robert Adamson",
  "Martín Adán",
  "Abd al-Wahhab Adarrak",
  "Alison Adburgham",
  "Arthur St John Adcock",
  "Fleur Adcock",
  "Jane Addams",
  "Joseph Addison",
  "Lucia H. Faxon Additon",
  "Kim Addonizio",
  "Ayobami Adebayo",
  "Remi Adedeji",
  "Mirza Adeeb",
  "Debra Adelaide",
  "Abimbola Adelakun",
  "Johann Christoph Adelung",
  "Sade Adeniran",
  "Saheed Aderinto",
  "Akin Adesokan",
  "Toyin Adewale-Gabriel",
  "Chimamanda Ngozi Adichie",
  "Aravind Adiga",
  "Opal Palmer Adisa",
  "Halide Edip Adıvar",
  "Mohammed ibn Adjurrum",
  "C. S. Adler",
  "David A. Adler",
  "Adomnán",
  "Judith Adong",
  "Alexandra Adornetto",
  "Stanislas Spero Adotevi",
  "Jorge Enrique Adoum",
  "Nizamuddin Asir Adrawi",
  "Wilna Adriaanse",
  "Edgar Adrian",
  "Artur Adson",
  "Adunis",
  "Amina Al Adwan",
  "Endre Ady",
  "Julia Cartwright Ady",
  "Mariska Ady",
];

function prepareData() {
  const book = fs
    .readFileSync("./book.txt", "utf-8")
    .split("\r\n")
    .filter((e) => {
      return e !== " " && e !== "\r" && e !== "";
    })
    .map((e) => {
      return e.trim();
    });

  let b = [...book, ...book, ...book, ...book];
  b = [...b, ...b, ...b];
  b = [...b, ...b, ...b, ...b];

  b.sort(() => Math.random() - 0.5);

  for (let index = 0; index < 915_000; index++) {
    const rand1 = parseInt(Math.random() * 915_000);
    const rand2 = parseInt(Math.random() * 915_000);
    const rand3 = parseInt(Math.random() * 915_000);
    const rand4 = parseInt(Math.random() * 915_000);
    const rand5 = parseInt(Math.random() * 915_000);

    const rand6 = parseInt(Math.random() * 70);

    data.push({
      id: index + 100,
      title: b[rand1],
      body: b[rand1] + b[rand2] + b[rand3] + b[rand4] + b[rand5],
      writer: authors[rand6],
    });
  }
}

console.log("---- prepare data (s) -----");
prepareData();
console.log("---- prepare data (f) -----");

async function bulk() {
  const operations = data.flatMap((doc) => [
    { index: { _index: "posts_4" } },
    doc,
  ]);
  operations.slice(0, 100_000);

  await client.bulk({
    refresh: true,
    operations: operations.slice(0, 100_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(100_000, 200_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(200_000, 300_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(300_000, 400_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(400_000, 500_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(500_000, 600_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(600_000, 700_000),
  });
  await client.bulk({
    refresh: true,
    operations: operations.slice(700_000, 800_000),
  });

  await client.bulk({
    refresh: true,
    operations: operations.slice(800_000, 900_000),
  });
}

console.log("---- bulk data (s) -----");
bulk();
console.log("---- bulk data (f) -----");
