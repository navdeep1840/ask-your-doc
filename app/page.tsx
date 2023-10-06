"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KeyAndFile from "@/components/KeyAndFile";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center">
        <Hero />
        <KeyAndFile />
      </div>
    </>
  );
}

{
  /* <input

        className="border border-black "
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />

      <button className="border bg-red-100" onClick={sendQuery}>
        ask ai
      </button>

      <button className="bg-blue-50" onClick={createIndexAndEmbeddings}>
        create
      </button> */
}
