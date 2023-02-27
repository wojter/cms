import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import UsersTable from "../../../components/admin/tables/usersTable";

const Users = () => {
  return (
    <Layout active={"Users"}>
      <Breadcrumb paths={[["Users", "/admin/users"]]} />
      <UsersTable />
    </Layout>
  );
};
Users.theme = 'dark'
export default Users;
