import Container from "./container";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/logo_sample.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getPostCategories } from "../../lib/front/load-posts";
import { Suspense } from "react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

async function getCategories() {
  const data = await getPostCategories();
  console.log(data);
  const categories = [{ name: "trave" }, { name: "livestye" }];
  return (
    <ul>
      {categories.map((item) => (
         <li key={item.name}>{item.name}</li>
      ))}
      <li>test</li>
  </ul>);
}

export default function Navbar() {
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


  return (
    <Container>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
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
                            <Disclosure as="div" className="">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
                                  Categories
                                  <Bars3Icon
                                    className={`${
                                      open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                  <Suspense fallback={<p>Loading...</p>}>
                                    <getCategories />
                                  </Suspense>
                                  
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
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
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
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
            </Disclosure.Panel>
          </>
        )}
        {/* <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
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
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
            </div>
            <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {menu.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className='dark:bg-gray-900 dark:text-white text-gray-300 
                  hover:bg-gray-700 hover:text-white first-letter:block px-3 py-2 
                  rounded-md text-base font-medium'
                        >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
            <div className="flex-col items-center justify-start hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
              {menu.map((item, index) => (
                <Link href={item.href} key={index}>
                  <a
                    className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    target={item.external ? "_blank" : ""}
                    rel={item.external ? "noopener" : ""}
                  >
                    <span> {item.name}</span>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded dark:bg-cyan-200 dark:text-blue-800 ">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </Link>
              ))}
            </div>
          </div> */}
      </Disclosure>
    </Container>
  );
}
