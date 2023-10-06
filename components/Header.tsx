import { PaperClipIcon } from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";

interface Props {}

const Header = (props: Props) => {
  return (
    <div className="p-10">
      <Link href={"/"}>
        <div className="flex items-center gap-4">
          <PaperClipIcon className="h-6 w-6 " />
          <h5 className="font-mono text-lg  ">Unleash Your Docs</h5>
        </div>
      </Link>
    </div>
  );
};

export default Header;
