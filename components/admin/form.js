import Link from "next/link";
import React, { Fragment } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import Moment from "./moment";

const Form = ({ formData, object, links = null }) => {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-y-2">
      {formData.map(([label, key, type], id) => {
        let objectBase = object;
        if (Array.isArray(key)) {
          key.forEach((k) => {
            objectBase = objectBase?.[k];
          });
        }
        if (!objectBase) {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <p className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                No data
              </p>
            </Fragment>
          );
        }

        if (type.startsWith("string")) {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <p className="w-min whitespace-nowrap">{objectBase[key]}</p>
            </Fragment>
          );
        } else if (type.startsWith("bool")) {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <div
                className={`text-white w-6 h-6 rounded grid place-items-center ${
                  objectBase[key] ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {objectBase[key] ? (
                  <HiCheck className="w-full h-full" />
                ) : (
                  <HiX className="w-full h-full" />
                )}
              </div>
            </Fragment>
          );
        } else if (type.startsWith("date")) {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <Moment date={objectBase[key]} format={"lll"} />
            </Fragment>
          );
        } else if (type.startsWith("link")) {
          const linkLabel = type.split(":")[1];
          const { linkPrototype, linkParams } = links[linkLabel];
          let link = linkPrototype;
          linkParams.forEach(([variable, getProp]) => {
            link = link.replace(variable, getProp(object));
          });
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <Link href={`/admin/${link}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline w-min whitespace-nowrap">
                  {objectBase}
                </a>
              </Link>
            </Fragment>
          );
        } else if (type.startsWith("post_body")) {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <p className="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{objectBase[key]}</p>
            </Fragment>
          );
        }
      })}
    </div>
  );
};

export default Form;
