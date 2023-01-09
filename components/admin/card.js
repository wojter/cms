import { createElement } from "react";
import Link from "next/link";

const Placeholder = () => {
  // never used component, defining tailwind classes in Card component using jsx variables in classNames
  // tailwind won't create css classes for them
  // so defining all classes in unused component here
  return (
    <>
      <div className="purple">
        <p className="dark:bg-purple-700"></p>
        <p className="dark:hover:bg-purple-800"></p>
        <p className="dark:bg-purple-800"></p>
        <p className="dark:group-hover:bg-purple-900"></p>
        <p className="text-purple-200"></p>
      </div>
      <div className="green">
        <p className="dark:bg-green-700"></p>
        <p className="dark:hover:bg-green-800"></p>
        <p className="dark:bg-green-800"></p>
        <p className="dark:group-hover:bg-green-900"></p>
        <p className="text-green-200"></p>
      </div>
      <div className="blue">
        <p className="dark:bg-blue-700"></p>
        <p className="dark:hover:bg-blue-800"></p>
        <p className="dark:bg-blue-800"></p>
        <p className="dark:group-hover:bg-blue-900"></p>
        <p className="text-blue-200"></p>
      </div>
      <div className="orange">
        <p className="dark:bg-orange-700"></p>
        <p className="dark:hover:bg-orange-800"></p>
        <p className="dark:bg-orange-800"></p>
        <p className="dark:group-hover:bg-orange-900"></p>
        <p className="text-orange-200"></p>
      </div>
    </>
  );
};

const Card = ({ href, icon, number, label, color }) => {
  return (
    <Link href={href}>
      <a
        className={`group dark:bg-${color}-700 dark:hover:bg-${color}-800 flex flex-row w-72 h-32 rounded-xl overflow-hidden text-${color}-200`}
      >
        {createElement(icon, {
          className: `dark:bg-${color}-800 dark:group-hover:bg-${color}-900 w-32 h-32 p-6 shrink-0`,
        })}
        <div className="flex flex-col p-4 items-end justify-center w-full">
          <p className="text-4xl font-bold">{number}</p>
          <p>{label}</p>
        </div>
      </a>
    </Link>
  );
};

export default Card;
