import { createElement } from "react";
// import { Card } from "flowbite-react";
import Link from "next/link";
import Router from "next/router";

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

import Layout from "../../components/admin/layout";
import Breadcrumb from "../../components/admin/breadcrumb";
import Card from "../../components/admin/card";

const handleClick = (e) => {
  e.preventDefault();
  Router.push(e.currentTarget.href);
};

const AdminHome = () => {
  return (
    <Layout active={"Dashboard"}>
      <p className="text-4xl">Dashboard</p>
      <Breadcrumb paths={[]} />
      <div className="flex flex-row gap-4">
        <Card
          href={"/admin/users"}
          icon={HiUser}
          number={1230}
          label={"Users"}
          color={"purple"}
        />

        <Card
          href={"/admin/posts"}
          icon={HiDocumentText}
          number={2132}
          label={"Posts"}
          color={"green"}
        />

        <Card
          href={"/admin/comments"}
          icon={HiChatAlt}
          number={67251}
          label={"Comments"}
          color={"blue"}
        />

        <Card
          href={"/admin/reactions"}
          icon={HiThumbUp}
          number={71427}
          label={"Reactions"}
          color={"orange"}
        />
      </div>
    </Layout>
  );
};

export default AdminHome;
