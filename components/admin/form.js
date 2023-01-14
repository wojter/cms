import Link from "next/link";
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

const Form = ({ formData, object, links = null }) => {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-y-2">
      {formData.map(([label, key, type], id) => {
        let objectBase = object;
        if (Array.isArray(key)) {
          key.forEach((k) => {
            objectBase = objectBase[k];
          });
        }
        if (type.startsWith("string")) {
          return (
            <Fragment key={id}>
              <p className="text-gray-400">{label}</p>
              <p>{objectBase[key]}</p>
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
        } else if (type.startsWith("list")) {
          if (type.startsWith("list-categories")) {
            let categories = objectBase[key];
            if (
              !categories ||
              (Array.isArray(categories) && categories.length === 0)
            ) {
              return (
                <Fragment key={id}>
                  <p className="text-gray-400">{label}</p>
                  <p className="text-gray-500">No categories</p>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={id}>
                  <p className="text-gray-400">{label}</p>
                  {objectBase[key].map((categoryName, idd) => (
                    <div key={idd}>{categoryName}</div>
                  ))}
                </Fragment>
              );
            }
          }
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
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {objectBase}
                </a>
              </Link>
            </Fragment>
          );
        }
      })}
    </div>
  );
};

// const Form = ({ formData, object, links = null }) => {
//   return (
//     <div className="grid grid-cols-[200px_1fr] gap-y-2">
//       {formData.map(([label, key, type, nestedKey, nestedType], id) => {
//         if (type.startsWith("string")) {
//           return (
//             <Fragment key={id}>
//               <p className="text-gray-400">{label}</p>
//               <p>{object[key]}</p>
//             </Fragment>
//           );
//         } else if (type.startsWith("bool")) {
//           return (
//             <Fragment key={id}>
//               <p className="text-gray-400">{label}</p>
//               <div
//                 className={`text-white w-6 h-6 rounded grid place-items-center ${
//                   object[key] ? "bg-green-500" : "bg-red-500"
//                 }`}
//               >
//                 {object[key] ? (
//                   <HiCheck className="w-full h-full" />
//                 ) : (
//                   <HiX className="w-full h-full" />
//                 )}
//               </div>
//             </Fragment>
//           );
//         } else if (type.startsWith("date")) {
//           return (
//             <Fragment key={id}>
//               <p className="text-gray-400">{label}</p>
//               <Moment date={object[key]} format={"lll"} />
//             </Fragment>
//           );
//         } else if (type.startsWith("list")) {
//           if (type.startsWith("list-categories")) {
//             let categories = object[key];
//             if (
//               !categories ||
//               (Array.isArray(categories) && categories.length === 0)
//             ) {
//               return (
//                 <Fragment key={id}>
//                   <p className="text-gray-400">{label}</p>
//                   <p className="text-gray-500">No categories</p>
//                 </Fragment>
//               );
//             } else {
//               return (
//                 <Fragment key={id}>
//                   <p className="text-gray-400">{label}</p>
//                   {object[key].map((categoryName, idd) => (
//                     <div key={idd}>{categoryName}</div>
//                   ))}
//                 </Fragment>
//               );
//             }
//           }
//         } else if (type.startsWith("link")) {
//           const linkLabel = type.split(":")[1];
//           const { linkPrototype, linkParams } = links[linkLabel];
//           let link = linkPrototype;
//           linkParams.forEach(([variable, fieldName, prop]) => {
//             link = link.replace(variable, rowRaw[fieldName][prop].toString());
//           });
//           return (
//             <Fragment key={id}>
//               <p className="text-gray-400">{label}</p>
//               <Link href={`/admin/${link}`}>
//                 <a className="text-blue-500 hover:text-blue-600 hover:underline">
//                   {text}
//                 </a>
//               </Link>
//             </Fragment>
//           );
//         } else if (type.startsWith("object")) {
//           if (nestedType.startsWith("string")) {
//             return (
//               <Fragment key={id}>
//                 <p className="text-gray-400">{label}</p>
//                 <p>{object[key][nestedKey]}</p>
//               </Fragment>
//             );
//           }
//         }
//       })}
//     </div>
//   );
// };

export default Form;
