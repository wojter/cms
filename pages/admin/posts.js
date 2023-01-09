import Breadcrumb from "../../components/admin/breadcrumb";
import Layout from "../../components/admin/layout";

const Posts = () => {
  return (
    <Layout active={"Posts"}>
      <p className="text-4xl">Posts</p>
      <Breadcrumb paths={[["Posts", "/admin/posts"]]} />
    </Layout>
  );
};

export default Posts;
