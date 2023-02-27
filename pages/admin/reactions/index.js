import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import ReactionsTable from "../../../components/admin/tables/reactionsTable";
import Tabs from "../../../components/admin/tabs";

const Reactions = () => {
  return (
    <Layout active={"Reactions"}>
      <Tabs
        active="Reactions"
        tabs={[
          ["Reactions", "/admin/reactions"],
          ["Reaction Categories", "/admin/reactions/categories"],
        ]}
      />
      <Breadcrumb paths={[["Reactions", "/admin/reactions"]]} />
      <ReactionsTable />
    </Layout>
  );
};
Reactions.theme = 'dark'
export default Reactions;
