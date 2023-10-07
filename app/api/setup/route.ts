import { Document } from "langchain/document";
import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { createPinconeIndex, updatePincone } from "@/utils";
import { indexName } from "@/config";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  const key = data.get("key") as string;

  // const blob = new Blob(); // e.g. from a file input

  const loader = new WebPDFLoader(file);

  const docs = await loader.load();

  console.log(key);

  // const loader = new DirectoryLoader("./documents", {
  //   ".pdf": (path) => new PDFLoader(path),
  // });

  // const x = await loader.load();

  // console.log(x);

  const vectorDimension = 1536;

  const client = new Pinecone({
    apiKey: process.env.PINCECONE_API || "",
    environment: process.env.PINCECONE_ENVIRONMENT || "",
  });

  try {
    console.log(`here treid`);
    await createPinconeIndex(client, indexName, vectorDimension);
    await updatePincone(client, indexName, docs, key);
  } catch (err) {
    console.log(`error :`, err);
  }

  return NextResponse.json({
    data: { success: true, msg: "Pdf Loaded" },
  });
}
