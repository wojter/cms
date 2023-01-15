import Breadcrumb from "../../../../components/admin/breadcrumb";
import Layout from "../../../../components/admin/layout";
import Tabs from "../../../../components/admin/tabs";
import ReactionCategoriesTable from "../../../../components/admin/tables/reactionCategoriesTable";

const ReactionCategories = () => {
  return (
    <Layout active={"Reactions"}>
      <Tabs
        active="Reaction Categories"
        tabs={[
          ["Reactions", "/admin/reactions"],
          ["Reaction Categories", "/admin/reactions/categories"],
        ]}
      />
      <Breadcrumb
        paths={[
          ["Reactions", "/admin/reactions"],
          ["Categories", "/admin/reactions/categories"],
        ]}
      />
      <ReactionCategoriesTable />
    </Layout>
  );
};

export default ReactionCategories;
