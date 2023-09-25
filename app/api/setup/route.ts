import { Document } from "langchain/document";
import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { createPinconeIndex, updatePincone } from "@/utils";
import { indexName } from "@/config";

export async function POST() {
  const loader = new DirectoryLoader("./documents", {
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await loader.load();

  const vectorDimension = 1536;

  const client = new Pinecone({
    apiKey: process.env.PINCECONE_API || "",
    environment: process.env.PINCECONE_ENVIRONMENT || "",
  });

  try {
    await createPinconeIndex(client, indexName, vectorDimension);

    await updatePincone(client, indexName, docs);
  } catch (err) {
    console.log(`error :`, err);
  }

  return NextResponse.json({
    data: ` data loaded in db`,
  });
}
