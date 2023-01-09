import Breadcrumb from "../../components/admin/breadcrumb";
import Layout from "../../components/admin/layout";

const PublicContent = () => {
  return (
    <Layout active={"Public content"}>
      <p className="text-4xl">Public content</p>
      <Breadcrumb paths={[["Public content", "/admin/public-content"]]} />
    </Layout>
  );
};

export default PublicContent;
