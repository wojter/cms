import Link from "next/link";
import React from "react";
import { HiOutlineReply } from "react-icons/hi";

const Title = ({ text, returnPath, buttons }) => {
  return (
    <div className="flex flex-row justify-between items-baseline">
      <div className="flex flex-row gap-4 items-baseline">
        <p className="text-4xl">{text}</p>
        {buttons()}
      </div>
      <Link href={returnPath}>
        <a className="text-white w-8 hover:text-gray-300">
          <HiOutlineReply className="w-full h-full" />
        </a>
      </Link>
    </div>
  );
};

export default Title;
