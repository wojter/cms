import Container from "./container";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/logo_sample.png";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getPostCategories } from "../../lib/front/load-posts";
import { Fragment, Suspense, useEffect } from "react";
import { useEffect } from "react";
import NavbarCategories from "./navbar_categories";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useUser } from "../../lib/hooks";
import { useData } from "../admin/providers/postCategoriesProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [categories, setCategories] = useState([
    { name: "travel" },
    { name: "technology" },
  ]);

  const { postCategories, setPostCategories, getPostCategories } = useData();

  useEffect(() => {
    getPostCategories();
  }, []);

  useEffect(() => {
    console.log("postCategories", postCategories);
  }, [postCategories]);

  const menu = [
    {
      name: "Home",
      href: "/",
      current: false,
    },
    {
      name: "Categories",
      href: "",
      current: true,
    },
    {
      name: "About",
      href: "/about",
      current: false,
    },
    {
      name: "Contact",
      href: "/contact",
      current: false,
    },
  ];

  const user = useUser();

  return (
    <Container>
      <Disclosure as="nav">
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center align-middle md:justify-start">
                <div className="flex flex-shrink-0 items-center ">
                  <Link href="/">
                    <a className="block w-auto md:hidden">
                      <Image
                        // className="block h-8 w-auto lg:hidden"
                        src={logoImg}
                        alt="Your Company"
                        height="70%"
                        width="100%"
                      />
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="hidden w-auto md:block">
                      <Image
                        // className="hidden h-8 w-auto lg:block"
                        src={logoImg}
                        alt="Your Company"
                        height="70%"
                        width="100%"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {menu.map((item) => {
                      if (item.name == "Categories") {
                        return (
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                            key={item.name}
                          >
                            <div>
                              <Menu.Button
                                className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm text-gray-600 
                                  dark:text-gray-400 font-medium focus:outline-none focus-visible:ring-2 
                                  focus-visible:ring-white focus-visible:ring-opacity-75"
                              >
                                Categories
                                <ChevronDownIcon
                                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>
                            <Menu.Items
                              className="absolute right-0 mt-0 w-32 z-50 origin-top-left divide-y divide-gray-100 
                              rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {postCategories && (
                                <NavbarCategories categories={postCategories} />
                              )}
                            </Menu.Items>
                          </Menu>
                        );
                      } else {
                        return (
                          <Link href={item.href} key={item.name}>
                            <a className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                              {item.name}
                            </a>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="flex ml-auto">
                  {user ? (
                    <Link href="/api/front/logout?role=user">
                      <div className="flex justify-end">
                        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                          Logout
                        </button>
                        <img
                          src="no-profile-picture.svg"
                          width="10%"
                          height="10%"
                        />
                      </div>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {menu.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel> */}
        </>
        {/* // )} */}
      </Disclosure>
    </Container>
  );
}
