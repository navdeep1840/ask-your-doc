import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";

import { queryPincone } from "@/utils";

import { indexName } from "@/config";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = new Pinecone({
    apiKey: process.env.PINCECONE_API || "",
    environment: process.env.PINCECONE_ENVIRONMENT || "",
  });

  const text = await queryPincone(client, indexName, body);

  console.log(`in the route : ${text}`);

  return NextResponse.json({
    data: text,
  });
}
