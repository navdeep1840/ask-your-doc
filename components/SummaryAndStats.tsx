import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Header from "./Header";
import { load } from "langchain/load";
import { FileUploadContext } from "@/context/file";

type Props = {};

const SummaryAndStats = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");

  const { key } = useContext(FileUploadContext);

  useEffect(() => {
    async function sendQuery() {
      setLoading(true);

      const query =
        "Give me a brief of the document with limit of 300-400 words.";

      try {
        const result = await fetch("/api/read", {
          method: "POST",
          body: JSON.stringify({ query, key }),
        });

        console.log(result);

        const json = await result.json();

        console.log(json.data);

        setSummary(json.data);
      } catch (err) {
        console.log(`err: `, err);
      } finally {
        setLoading(false);
      }
    }
    if (key) {
      sendQuery();
    }
  }, [key]);

  return (
    <section className="">
      <Header />
      <div className="md:p-12 p-8  ">
        <div className="relative ">
          <Image src="/final.svg" alt="svg" height={440} width={100} />
          <p className="absolute left-[3rem] top-[50%] text-2xl">
            Summary of your pdf
          </p>
        </div>

        <div className="my-4 md:m-4 p-4  bg-[rgb(30,140,251)] backdrop-blur-lg bg-opacity-60   w-full   border-none outline-none rounded-lg text-white">
          {loading ? "Generating the summary for the document..... " : summary}
        </div>
      </div>
    </section>
  );
};

export default SummaryAndStats;
