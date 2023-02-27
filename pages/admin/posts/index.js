import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import Tabs from "../../../components/admin/tabs";
import PostsTable from "../../../components/admin/tables/postsTable";

const Posts = () => {
  return (
    <Layout active={"Posts"}>
      <Tabs
        active="Posts"
        tabs={[
          ["Posts", "/admin/posts"],
          ["Post Categories", "/admin/posts/categories"],
        ]}
      />
      <Breadcrumb paths={[["Posts", "/admin/posts"]]} />
      <PostsTable />
    </Layout>
  );
};
Posts.theme = 'dark'
export default Posts;
