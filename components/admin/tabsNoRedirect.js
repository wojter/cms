import { useState } from "react";

const TabsNoRedirect = ({ titles, elements }) => {
  const [tabId, setTabId] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row text-sm border-b border-gray-700">
        {titles.map((title, id) => (
          <button
            key={id}
            onClick={() => {
              setTabId(id);
            }}
            className={` border-blue-500 px-4 py-2 hover:cursor-pointer ${
              tabId === id
                ? "border-b-2 text-blue-500 hover:text-blue-400 hover:border-blue-400"
                : "border-transparent text-gray-400 hover:border-b-2 hover:text-gray-300 hover:border-gray-300"
            }`}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">{elements[tabId]}</div>
    </div>
  );
};

export default TabsNoRedirect;
