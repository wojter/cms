import Breadcrumb from "../../components/admin/breadcrumb";
import Layout from "../../components/admin/layout";

const Reactions = () => {
  return (
    <Layout active={"Reactions"}>
      <p className="text-4xl">Reactions</p>
      <Breadcrumb paths={[["Reactions", "/admin/reactions"]]} />
    </Layout>
  );
};

export default Reactions;
