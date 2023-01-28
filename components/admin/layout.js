import React from "react";
import { useUser } from "../../lib/hooks";

import Sidebar from "./sidebar";

const Layout = ({ children, active }) => {
  const admin = useUser({
    redirectTo: "/admin/login",
    redirectIfFound: false,
    isAdmin: true,
  });

  return (
    <>
      {admin && (
        <div className="flex flex-row relative overflow-x-hidden dark:bg-gray-800">
          <Sidebar active={active} />
          <main className="w-full p-4 dark:bg-gray-750 dark:text-white flex flex-col gap-4">
            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
