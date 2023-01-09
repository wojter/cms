import React, { Fragment } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import Moment from "./moment";

// Example from data
// const formData = [
//   ["ID", "_id", "string"],
//   ["Email", "email", "string"],
//   ["Username", "username", "string"],
//   ["Is Admin", "is_admin", "bool"],
//   ["Created", "created", "date"],
// ];

const Form = ({ formData, object }) => {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-y-2">
      {formData.map(([label, key, type], id) => {
        if (type === "string") {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <p>{object[key]}</p>
            </Fragment>
          );
        } else if (type === "bool") {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <div
                className={`text-white w-6 h-6 rounded grid place-items-center ${
                  object[key] ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {object[key] ? (
                  <HiCheck className="w-full h-full" />
                ) : (
                  <HiX className="w-full h-full" />
                )}
              </div>
            </Fragment>
          );
        } else if (type === "date") {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <Moment date={object[key]} format={"lll"} />
            </Fragment>
          );
        }
      })}
    </div>
  );
};

export default Form;
