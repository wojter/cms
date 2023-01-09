import Router from "next/router";
import { Breadcrumb as BreadcrumbFL } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useToast } from "./providers/toastProvider";

const handleClick = (e) => {
  e.preventDefault();
  Router.push(e.currentTarget.lastChild.href);
};

const Breadcrumb = ({ paths }) => {
  return (
    <>
      {paths && (
        <BreadcrumbFL aria-label="Breadcrumb" className="h-6 flex items-center">
          <BreadcrumbFL.Item href="/admin" icon={HiHome} onClick={handleClick}>
            Home
          </BreadcrumbFL.Item>
          {paths.map(([name, href], id) => (
            <BreadcrumbFL.Item key={id} href={href} onClick={handleClick}>
              {name}
            </BreadcrumbFL.Item>
          ))}
        </BreadcrumbFL>
      )}
    </>
  );
};

export default Breadcrumb;
