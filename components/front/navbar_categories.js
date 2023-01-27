import { getPostCategories } from "../../lib/front/load-posts";
import Link from "next/link";
import { Menu } from "@headlessui/react";

async function getCategories() {
  const data = await getPostCategories();
  console.log(data);
  return data;
}

export default async function NavbarCategories(props) {
  const categories = await getCategories();
  //   const categories2 = getCategories();

  return (
    <>
      {/* {categories.map((item) => {
        <Link href={item.name} key={item.name}>
          <a className="text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 rounded-md text-sm font-medium">
            {item.name}
          </a>
        </Link>;
      })} */}

      <div className="px-1 py-1">
        {categories.map((item) => (
          <Menu.Item key={item.name} as="div">
            <Link href={`/postcategory?id=${item.name}`} key={item.name}>
              <a
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 px-5 py-2 
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
