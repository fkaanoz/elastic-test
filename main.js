import { Client } from "@elastic/elasticsearch";
import fs from "fs";

const client = new Client({
  node: "http://localhost:9200",
});

async function createIndex() {
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

//createIndex();

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

  const b = book.concat(book).concat(book).concat(book);

  b.sort(() => Math.random() - 0.5);

  for (let index = 0; index < 76000; index++) {
    const rand1 = parseInt(Math.random() * 75_000);
    const rand2 = parseInt(Math.random() * 75_000);
    const rand3 = parseInt(Math.random() * 75_000);
    const rand4 = parseInt(Math.random() * 75_000);
    const rand5 = parseInt(Math.random() * 75_000);

    const rand6 = parseInt(Math.random() * 70);

    data.push({
      id: index + 100,
      title: b[rand1],
      body: b[rand1] + b[rand2] + b[rand3] + b[rand4] + b[rand5],
      writer: authors[rand6],
    });
  }
}
prepareData();

async function bulk() {
  const operations = data.flatMap((doc) => [
    { index: { _index: "posts" } },
    doc,
  ]);

  const bulkResponse = await client.bulk({ refresh: true, operations });
}

bulk();
