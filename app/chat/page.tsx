"use client";
import ChatView from "@/components/ChatView";
import Header from "@/components/Header";
import SummaryAndStats from "@/components/SummaryAndStats";
import { FileUploadContext } from "@/context/file";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

const Chat = (props: Props) => {
  const { selectedFile } = useContext(FileUploadContext);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function createIndexAndEmbeddings(file) {
      const formData = new FormData();

      formData.append("file", file);
      setLoading(true);

      try {
        const result = await fetch("/api/setup", {
          method: "POST",
          body: formData,
        });

        const json = await result.json();

        const data = json.data;

        if (data.success) {
          setLoading(false);
          alert(`yeahh`);
        } else {
          router.push("");
        }

        console.log(`result`, json);
      } catch (err) {
        console.log(`err: `, err);
      }
    }

    if (selectedFile) {
      createIndexAndEmbeddings(selectedFile);
    }
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full">
        <Image
          src={"/load.gif"}
          alt="load"
          // className="h-auto w-full"
          fill
        />
      </div>
    );

  return (
    <>
      {/* <Header /> */}
      <div className="grid grid-cols-1 md:grid-cols-2  h-screen">
        <SummaryAndStats />
        <ChatView />
      </div>
    </>
  );
};

export default Chat;
