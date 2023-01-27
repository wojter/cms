import Container from "./container";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/logo_sample.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getPostCategories } from "../../lib/front/load-posts";
import { Fragment, Suspense, useEffect } from "react";
import NavbarCategories from "./navbar_categories";
import { Dropdown } from "flowbite-react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { useUser } from "../../lib/hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [categories, setCategories] = useState([
    { name: "travel" },
    { name: "technology" },
  ]);

  useEffect(() => {
    console.log(getCategories());
  }, []);

  async function getCategories() {
    const data = await getPostCategories();
    // console.log(data);
    return data;
  }

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
        {/* {({ open }) => ( */}
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div> */}
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
                              {/* <NavbarCategories /> */}
                              {/* <div className="px-1 py-1">
                                  {categories.map((item) => 
                                    <Menu.Item key={item.name} as="div">
                                      <Link
                                        href={`/postcategory?id=${item.name}`}
                                        key={item.name}
                                      >
                                        <a
                                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 
                                        rounded-md text-sm font-medium capitalize"
                                        >
                                          {item.name}
                                        </a>
                                      </Link>
                                    </Menu.Item>
                                  )}
                                  
                                </div>*/}
                              <NavbarCategories cattegories={categories} />
                            </Menu.Items>
                          </Menu>
                          // <div className="flex">
                          //   <Dropdown
                          //     className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium"
                          //     arrowIcon={false}
                          //     inline={true}
                          //     label="Categories"
                          //   >
                          //   </Dropdown>
                          // </div>
                          // <Disclosure as="div" className="">
                          //   {({ open }) => (
                          //     <>
                          //       <Disclosure.Button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                          //         Categories
                          //         {/* <svg
                          //           xmlns="http://www.w3.org/2000/svg"
                          //           fill="none"
                          //           viewBox="0 0 24 24"
                          //           stroke-width="1.5"
                          //           stroke="currentColor"
                          //           class="w-6 h-6"
                          //         >
                          //           <path
                          //             stroke-linecap="round"
                          //             stroke-linejoin="round"
                          //             d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          //           />
                          //         </svg> */}
                          //         {/* className={`${
                          //             open ? "rotate-180 transform" : ""
                          //           } h-5 w-5 text-purple-500`} */}
                          //       </Disclosure.Button>
                          //       <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          //         <Suspense fallback={<p>Loading...</p>}>
                          //           <NavbarCategories />
                          //         </Suspense>
                          //       </Disclosure.Panel>
                          //     </>
                          //   )}
                          // // </Disclosure>
                          // <Link href={item.href} key={item.name}>
                          //   <a className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                          //     {item.name}
                          //   </a>
                          // </Link>
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
                      <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                        Logout
                      </button>
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
