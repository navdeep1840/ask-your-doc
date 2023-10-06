import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

type Props = {
  sendQuery: VoidFunction;
  setQuery: (e: string) => void;
  query: string;
};

const QueryInput = ({ sendQuery, setQuery, query }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendQuery();
  };

  return (
    <div className="flex gap-4 relative  items-center">
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={query}
          placeholder="Ask your pdf... "
          onChange={(e) => setQuery(e.target.value)}
          className="p-[0.9rem]  bg-[rgb(30,140,251)] w-full placeholder:text-white  border-none outline-none rounded-lg text-white"
        />
      </form>

      <PaperAirplaneIcon className="h-6 w-6 text-white absolute right-2" />
    </div>
  );
};

export default QueryInput;
