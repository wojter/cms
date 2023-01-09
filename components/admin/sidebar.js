import { createElement } from "react";
import { Sidebar as SidebarFL } from "flowbite-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import {
  HiChartPie,
  HiLogout,
  HiViewGrid,
  HiUser,
  HiChatAlt,
  HiThumbUp,
  HiCog,
  HiDocumentText,
} from "react-icons/hi";

// const SidebarLink = ({ href, icon, children }) => {
//   const router = useRouter();
//   const route = router.route;
//   return (
//     <li>
//       <Link href={href}>
//         <a
//           className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//             href === route && "bg-gray-100 dark:bg-gray-700"
//           }`}
//         >
//           {createElement(icon, {
//             className: `h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-white ${
//               href === route && "dark:text-white"
//             }`,
//           })}
//           <span className="ml-3">{children}</span>
//         </a>
//       </Link>
//     </li>
//   );
// };

const handleClick = (e) => {
  e.preventDefault();
  Router.push(e.currentTarget.href);
};

const Sidebar = ({ active }) => {
  return (
    <div className="w-fit dark:bg-gray-800 h-screen sticky top-0">
      <SidebarFL>
        <SidebarFL.Logo
          href="/admin"
          img="/logo.svg"
          imgAlt="Flowbite logo"
          className="mb-8"
        >
          Admin Panel
        </SidebarFL.Logo>
        <SidebarFL.Items>
          <SidebarFL.ItemGroup>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin"
              icon={HiChartPie}
              active={active === "Dashboard"}
            >
              Dashboard
            </SidebarFL.Item>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin/public-content"
              icon={HiViewGrid}
              active={active === "Public content"}
            >
              Public content
            </SidebarFL.Item>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin/users"
              icon={HiUser}
              active={active === "Users"}
            >
              Users
            </SidebarFL.Item>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin/posts"
              icon={HiDocumentText}
              active={active === "Posts"}
            >
              Posts
            </SidebarFL.Item>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin/comments"
              icon={HiChatAlt}
              active={active === "Comments"}
            >
              Comments
            </SidebarFL.Item>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin/reactions"
              icon={HiThumbUp}
              active={active === "Reactions"}
            >
              Reactions
            </SidebarFL.Item>
          </SidebarFL.ItemGroup>

          <SidebarFL.ItemGroup>
            <SidebarFL.Item
              onClick={handleClick}
              href="/admin/settings"
              icon={HiCog}
              active={active === "Settings"}
            >
              Settings
            </SidebarFL.Item>
            <SidebarFL.Item
              href="/api/logout?role=admin&redirect=admin"
              icon={HiLogout}
            >
              Logout
            </SidebarFL.Item>
          </SidebarFL.ItemGroup>
        </SidebarFL.Items>
      </SidebarFL>
    </div>
  );
};

export default Sidebar;
