"use client";

import Hero from "@/components/Hero";
import KeyAndFile from "@/components/KeyAndFile";
import { send } from "process";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });

      const json = await result.json();
      console.log(`result`, json);
    } catch (err) {
      console.log(`err: `, err);
    }
  }

  async function sendQuery() {
    if (!query) return;
    setResult("");

    setLoading(true);

    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });

      const json = await result.json();

      setResult(json.data);
    } catch (err) {
      console.log(`err: `, err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 place-content-center">
      <Hero />
      <KeyAndFile />
      {/* <input

        className="border border-black "
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />

      <button className="border bg-red-100" onClick={sendQuery}>
        ask ai
      </button>

      <button className="bg-blue-50" onClick={createIndexAndEmbeddings}>
        create
      </button> */}
    </div>
  );
}
