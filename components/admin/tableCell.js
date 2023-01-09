import React from "react";
import Moment from "./moment";
import { Table as TableFL } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

const TableCell = ({ text, type, id }) => {
  if (type === "date") {
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
  }
  return (
    <TableFL.Cell className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
      {text}
    </TableFL.Cell>
  );
};

export default TableCell;
