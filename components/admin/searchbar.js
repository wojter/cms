import { Button } from "flowbite-react";
import React, { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { useRefetch } from "./providers/refetchProvider";

const Searchbar = ({ searchTerm, setSearchTerm, refetchName }) => {
  const { refetch } = useRefetch();

  return (
    <div className="flex flex-row w-full relative items-center">
      <div className="w-5 absolute left-4 text-gray-500 z-10">
        <HiSearch className="w-full h-full" />
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 sm:rounded-l-lg border-gray-700 pl-12"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {searchTerm && (
          <div className="h-full w-8 absolute top-0 right-0 grid place-items-center">
            <div
              onClick={() => setSearchTerm("")}
              className="w-4 text-gray-500 hover:cursor-pointer"
            >
              <HiX className="w-full h-full" />
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => refetch(refetchName)}
        className="sm:rounded-none sm:rounded-r-lg"
      >
        Search
      </Button>
    </div>
  );
};

export default Searchbar;
