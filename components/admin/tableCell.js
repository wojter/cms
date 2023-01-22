import React from "react";
import Moment from "./moment";
import { Table as TableFL } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import Link from "next/link";

const TableCell = ({ text, type, links, rowRaw }) => {
  if (text === null || text === undefined) {
    return (
      <TableFL.Cell className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
        No data
      </TableFL.Cell>
    );
  }
  if (type === "string") {
    return (
      <TableFL.Cell className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </TableFL.Cell>
    );
  } else if (type === "date") {
    return (
      <TableFL.Cell className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
        <Moment date={text} format={"lll"} />
      </TableFL.Cell>
    );
  } else if (type === "bool") {
    const bgColor = text ? "bg-green-500" : "bg-red-500";
    const icon = text ? HiCheck : HiX;
    return (
      <TableFL.Cell className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
        <div
          className={`text-white w-6 h-6 rounded grid place-items-center ${bgColor}`}
        >
          {React.createElement(icon, { className: "w-full h-full" })}
        </div>
      </TableFL.Cell>
    );
  } else if (type.startsWith("link")) {
    const linkLabel = type.split(":")[1];
    const { linkPrototype, linkParams } = links[linkLabel];
    let link = linkPrototype;
    linkParams.forEach(([variable, prop1, prop2]) => {
      link = link.replace(variable, rowRaw[prop1][prop2].toString());
    });
    return (
      <TableFL.Cell className="whitespace-nowrap overflow-hidden text-ellipsis ">
        <Link href={`/admin/${link}`}>
          <a className="text-blue-500 hover:text-blue-600 hover:underline">
            {text}
          </a>
        </Link>
      </TableFL.Cell>
    );
  } else if (type.startsWith("image")) {
    return (
      <TableFL.Cell className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
        <img src={text} alt={text} />
      </TableFL.Cell>
    );
  } else {
    return (
      <TableFL.Cell className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </TableFL.Cell>
    );
  }
};

export default TableCell;
