import Breadcrumb from "../../components/admin/breadcrumb";
import Layout from "../../components/admin/layout";

const Comments = () => {
  return (
    <Layout active={"Comments"}>
      <p className="text-4xl">Comments</p>
      <Breadcrumb paths={[["Comments", "/admin/comments"]]} />
    </Layout>
  );
};

export default Comments;
