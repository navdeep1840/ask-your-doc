import { PaperClipIcon } from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";

interface Props {}

const Header = (props: Props) => {
  return (
    <div className="md:p-10 p-4">
      <Link href={"/"}>
        <div className="flex items-center gap-3">
          <PaperClipIcon className="h-5 w-5 " />
          <h5 className=" md:text-lg  ">Unleash Your Docs</h5>
        </div>
      </Link>
    </div>
  );
};

export default Header;
