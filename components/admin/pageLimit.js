import React from "react";

const PageLimit = ({ handleLimitChange }) => {
  return (
    <div className="flex flex-row gap-2 items-center h-full">
      <select
        onChange={handleLimitChange}
        className="leading-4 h-full bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:cursor-pointer text-gray-400 hover:text-white"
      >
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span className="text-gray-400">Documents per page</span>
    </div>
  );
};

export default PageLimit;
