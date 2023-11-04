import { FileUploadProvider } from "@/context/file";
import { CheckCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import React, {
  useRef,
  useState,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import { FileUploadContext } from "@/context/file";
import { useRouter } from "next/navigation";

type Props = {};

const KeyAndFile = (props: Props) => {
  // const [file, setFile] = useState<Blob | string>("");
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  const { setSelectedFile, setKey } = useContext(FileUploadContext);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (openAIKey === "") return;
    setKey(openAIKey);
    setSuccess(true);
    localStorage.setItem("key", openAIKey);

    setOpenAIKey("");
  };

  return (
    <div className="space-y-8 lg:p-24 p-8 ">
      <div className="space-y-3">
        <p className=" text-xl lg:text-3xl ">1. OpenAI Key</p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 max-w-[31rem] items-center">
            <input
              type="text"
              className="p-[0.9rem] bg-[rgb(30,140,251)] w-full  border-none outline-none rounded-lg text-white"
              value={openAIKey}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOpenAIKey(e.target.value)
              }
              pattern="^sk-[a-zA-Z0-9]{32,}$"
            />
            <button
              type="submit"
              className="text-[1rem] p-[0.9rem] font-bold text-white bg-black rounded-lg"
            >
              Verify
            </button>
          </div>

          {success && (
            <p className="flex gap-2 pt-2 items-center text-sm">
              <CheckCircleIcon className="h-5 w-5 text-green-400" /> Key Added
            </p>
          )}
        </form>
      </div>

      <div className="space-y-3">
        <p className=" text-xl lg:text-3xl ">2. Upload Document</p>
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
                localStorage.setItem("file", event.target.files[0]);

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
