import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {};

const KeyAndFile = (props: Props) => {
  return (
    <div className="space-y-8 p-24 ">
      <div className="space-y-3">
        <p className="text-3xl ">1. OpenAI Key</p>
        <div className="flex gap-4 max-w-[31rem] items-center">
          <input
            type="text"
            className="p-[0.9rem] bg-[rgb(30,140,251)] w-full  border-none outline-none rounded-lg text-white"
          />
          <button className="text-[1rem] p-[0.9rem] text-[#979DAC] bg-black rounded-lg">
            Submit
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-3xl ">2. Upload Doucment</p>
        <div className="flex flex-col text-gray-100 justify-center  gap-1 w-full max-w-[31rem] rounded-md items-center h-40 bg-[rgb(30,140,251)] ">
          {/* <input
            type="file"
            className="p-[0.9rem] bg-[rgb(30,140,251)] w-full max-w-[30rem] border-none outline-none rounded-lg text-white"
          /> */}
          <CloudArrowUpIcon className="w-8 h-8" />
          <p className="text-sm font-semibold">Click to upload</p>
          <p>Supported formats: .pdf, .docx</p>
        </div>
      </div>
    </div>
  );
};

export default KeyAndFile;
