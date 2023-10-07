import { metadata } from "./app/layout";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { timeout } from "./config";
import { resolve } from "path";

export const createPinconeIndex = async (
  client,
  indexName,
  vectorDimension
) => {
  const existingIndexes = await client.listIndexes();

  console.log(indexName, vectorDimension, existingIndexes);

  if (!existingIndexes[0]?.name.includes(indexName)) {
    await client.createIndex({
      name: indexName,
      dimension: vectorDimension,
      metric: "cosine",
    });

    await new Promise((resolve) => setTimeout(resolve, timeout));

    console.log(`index created`);
  } else {
    return;
  }
};

export const updatePincone = async (client, indexName, docs, key) => {
  const index = client.index(indexName);

  console.log(` Pincone index upadte run  ${indexName}`);

  for (let idx = 0; idx < docs.length; idx++) {
    console.log(`Processing document: ${docs.length}  `);

    console.log(` hello processsing this index   ${idx}`);

    const txtPath = docs[idx].metadata?.source;
    const text = docs[idx].pageContent;

    console.log(txtPath, text);

    const textSplit = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });

    console.log(`text splitted into chunks`);

    const chunks = await textSplit.createDocuments([text]);

    console.log(`now creating embeddings`);

    const embeddingsArrays = await new OpenAIEmbeddings({
      openAIApiKey: key,
    }).embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
    );

    const batchSize = 100;
    let batch: any = [];

    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];

      const vector = {
        id: `${txtPath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath,
        },
      };

      batch = [...batch, vector];

      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert(batch);

        batch = [];
      }
    }
  }
};

export const queryPincone = async (client, indexName, question, key) => {
  const index = client.Index(indexName);

  const queryEmbedding = await new OpenAIEmbeddings({
    openAIApiKey: key,
  }).embedQuery(question);

  console.log(` got query response`, queryEmbedding);

  let queryResponse = await index.query({
    topK: 1,
    vector: queryEmbedding,
    includeMetadata: true,

    includeValues: true,
  });

  console.log(` got query response`, queryResponse);

  console.log(`asking question`);

  if (queryResponse.matches.length) {
    const llm = new OpenAI({
      openAIApiKey: key,
    });
    const chain = loadQAStuffChain(llm);

    const concatenatedPageContent = queryResponse.matches.map(
      (match) => match.metadata.pageContent
    );

    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: question,
    });

    console.log(`Answer : ${result.text}`);

    return result.text;
  } else {
    console.log(`no matches found  to your question`);
  }
};
