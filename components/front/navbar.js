import Container from "./container";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/logo_sample.png";

const Navbar = () => {
  const menu = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Categories",
      href: "",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <Container>
      <nav>
        <Disclosure>
          <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a className="w-28 dark:hidden">
                  <Image
                    src={logoImg}
                    alt="Logo"
                    layout="responsive"
                    sizes="(max-width: 640px) 10vw, 200px"
                    priority={true}
                  />
                </a>
              </Link>
              <Link href="/">
                <a className="hidden w-28 dark:block">
                  <Image
                    src={logoImg}
                    alt="Logo"
                    layout="responsive"
                    sizes="(max-width: 640px) 10vw, 200px"
                    priority={true}
                  />
                </a>
              </Link>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 "
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                </svg>
              </Disclosure.Button>
            </div>

            <div className="flex-col items-center justify-start hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
              {menu.map((item, index) => (
                <Link href={item.href} key={index}>
                  <a
                    className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    target={item.external ? "_blank" : ""}
                    rel={item.external ? "noopener" : ""}
                  >
                    <span> {item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded dark:bg-cyan-200 dark:text-blue-800 ">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </Disclosure>
      </nav>
    </Container>
  );
};

export default Navbar;
