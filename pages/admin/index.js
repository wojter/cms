import { HiUser, HiChatAlt, HiThumbUp, HiDocumentText } from "react-icons/hi";

import Layout from "../../components/admin/layout";
import Breadcrumb from "../../components/admin/breadcrumb";
import Card from "../../components/admin/card";
import { useEffect, useState } from "react";
import { useToast } from "../../components/admin/providers/toastProvider";

const AdminHome = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [numbers, setNumbers] = useState(null);

  const { setToast } = useToast();

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      setDataLoading(true);
      const res = await fetch("/api/admin/dashboard");
      if (res.status === 200) {
        const numbers = await res.json();
        setNumbers(numbers);
      }
      setDataLoading(false);
    } catch (err) {
      setDataLoading(false);
      console.log(err);
      setToast("An error occured while fetching data", false);
    }
  };

  return (
    <Layout active={"Dashboard"}>
      <p className="text-4xl">Dashboard</p>
      <Breadcrumb paths={[]} />
      <div className="flex flex-row gap-4">
        <Card
          href={"/admin/users"}
          icon={HiUser}
          number={numbers?.users}
          label={"Users"}
          color={"purple"}
        />

        <Card
          href={"/admin/posts"}
          icon={HiDocumentText}
          number={numbers?.posts}
          label={"Posts"}
          color={"green"}
        />

        <Card
          href={"/admin/comments"}
          icon={HiChatAlt}
          number={numbers?.comments}
          label={"Comments"}
          color={"blue"}
        />

        <Card
          href={"/admin/reactions"}
          icon={HiThumbUp}
          number={numbers?.reactions}
          label={"Reactions"}
          color={"orange"}
        />
      </div>
    </Layout>
  );
};

export default AdminHome;
