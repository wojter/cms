import Breadcrumb from "../../../../components/admin/breadcrumb";
import Layout from "../../../../components/admin/layout";
import Tabs from "../../../../components/admin/tabs";
import PostCategoriesTable from "../../../../components/admin/tables/postCategoriesTable";

const PostCategories = () => {
  return (
    <Layout active={"Posts"}>
      <Tabs
        active="Post Categories"
        tabs={[
          ["Posts", "/admin/posts"],
          ["Post Categories", "/admin/posts/categories"],
        ]}
      />
      <Breadcrumb
        paths={[
          ["Posts", "/admin/posts"],
          ["Categories", "/admin/posts/categories"],
        ]}
      />
      <PostCategoriesTable />
    </Layout>
  );
};

export default PostCategories;
