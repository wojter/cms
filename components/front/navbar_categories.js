import { getPostCategories } from "../../lib/front/load-posts";
import Link from "next/link";
import { Menu } from "@headlessui/react";

export default function NavbarCategories(props) {
  const categories = props.categories;


  return (
    <>
      <div className="px-1 py-1">
        {categories.map((item) => (
          <Menu.Item key={item.name} as="div">
            <Link href={`/postcategory?id=${item.name}`} key={item.name}>
              <a
                className="p-2 py-4 text-gray-600 dark:text-gray-400 hover:text-blue-500
                                        rounded-md text-sm font-medium capitalize"
              >
                {item.name}
              </a>
            </Link>
          </Menu.Item>
        ))}
      </div>
    </>
  );
}
