import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import CommentsTable from "../../../components/admin/tables/commentsTable";

const Comments = () => {
  return (
    <Layout active={"Comments"}>
      <Breadcrumb paths={[["Comments", "/admin/comments"]]} />
      <CommentsTable />
    </Layout>
  );
};

export default Comments;
