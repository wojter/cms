import Breadcrumb from "../../components/admin/breadcrumb";
import Layout from "../../components/admin/layout";

const Settings = () => {
  return (
    <Layout active={"Settings"}>
      <p className="text-4xl">Settings</p>
      <Breadcrumb paths={[["Settings", "/admin/settings"]]} />
    </Layout>
  );
};

export default Settings;
