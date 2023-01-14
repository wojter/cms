import { Tabs as TabsFL } from "flowbite-react";
import Link from "next/link";

const Tabs = ({ tabs, active }) => {
  return (
    <div className="flex flex-row text-sm border-b border-gray-700">
      {tabs.map(([title, href], id) => (
        <Link href={href} key={id}>
          <a
            className={` border-blue-500 px-4 py-2 ${
              active === title
                ? "border-b-2 text-blue-500 hover:text-blue-400 hover:border-blue-400"
                : "border-transparent text-gray-400 hover:border-b-2 hover:text-gray-300 hover:border-gray-300"
            }`}
          >
            {title}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
