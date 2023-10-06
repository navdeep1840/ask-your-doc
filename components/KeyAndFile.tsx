import { FileUploadProvider } from "@/context/file";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState, useContext } from "react";
import { FileUploadContext } from "@/context/file";
import { useRouter } from "next/navigation";

type Props = {};

const KeyAndFile = (props: Props) => {
  // const [file, setFile] = useState<Blob | string>("");

  const router = useRouter();

  const { setSelectedFile } = useContext(FileUploadContext);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8 p-24 ">
      <div className="space-y-3">
        <p className="text-3xl ">1. OpenAI Key</p>
        <div className="flex gap-4 max-w-[31rem] items-center">
          <input
            type="text"
            className="p-[0.9rem] bg-[rgb(30,140,251)] w-full  border-none outline-none rounded-lg text-white"
          />
          <button className="text-[1rem] p-[0.9rem] font-bold text-white bg-black rounded-lg">
            Submit
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-3xl ">2. Upload Doucment</p>
        <div
          onClick={handleFileButtonClick}
          className="flex flex-col cursor-pointer text-gray-100 justify-center  gap-1 w-full max-w-[31rem] rounded-md items-center h-40 bg-[rgb(30,140,251)] "
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            name="image"
            className="hidden"
            onChange={(event: any) => {
              if (event.target.files[0].size > 10000000) {
                alert("File is too big!");
                return;
              } else {
                // setFieldValue("image", event.target.files[0]);
                // setFile(event.target.files[0]);
                // createIndexAndEmbeddings(event.target.files[0]);
                setSelectedFile(event.target.files[0]);

                router.push("/chat");
              }
            }}
          />
          <CloudArrowUpIcon className="w-8 h-8" />
          <p className="text-sm font-semibold">Click to upload</p>
          <p>Supported formats: .pdf</p>
        </div>
      </div>
    </div>
  );
};

export default KeyAndFile;
