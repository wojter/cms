import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import ImagesTable from "../../../components/admin/tables/imagesTable";

const Images = () => {
  return (
    <Layout active={"Images"}>
      <Breadcrumb paths={[["Images", "/admin/images"]]} />
      <ImagesTable />
    </Layout>
  );
};
Images.theme = 'dark'
export default Images;
