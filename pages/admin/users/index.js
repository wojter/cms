import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiUserAdd,
} from "react-icons/hi";
import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import ModalNewUser from "../../../components/admin/modals/modalNewUser";
import ModalEditUser from "../../../components/admin/modals/modalEditUser";
import ModalDeleteUser from "../../../components/admin/modals/modalDeleteUser";
import Table from "../../../components/admin/table";
import { Button } from "flowbite-react";
import useModal from "../../../components/admin/hooks/useModal";

const Users = () => {
  const newUserModalHook = useModal();
  const editUserModalHook = useModal();
  const deleteUserModalHook = useModal();

  const tableProps = {
    title: "Users",
    refetchName: "users",
    apiPath: "users",
    headers: ["id", "email", "username", "is admin", "created"],
    headerTypes: ["string", "string", "string", "bool", "date"],
    dataMapper: (user) => [
      user._id,
      user.email,
      user.username,
      user.is_admin,
      user.created,
    ],
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newUserModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiUserAdd className="w-5 h-5 mr-2" />
          New User
        </Button>
      </>
    ),
    actionButtons: (user) => (
      <>
        <button
          onClick={() => {
            deleteUserModalHook.setData(user);
            deleteUserModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
        >
          <HiTrash className="w-full h-full" />
        </button>
        <button
          onClick={() => {
            editUserModalHook.setData(user);
            editUserModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
        >
          <HiPencilAlt className="w-full h-full" />
        </button>
        <Link href={`/admin/users/user-details?id=${user._id.toString()}`}>
          <a className="w-5 text-slate-500 hover:text-slate-600 tooltip-details">
            <HiOutlineChevronRight className="w-full h-full" />
          </a>
        </Link>
      </>
    ),
  };
  return (
    <Layout active={"Users"}>
      <ModalNewUser
        isOpen={newUserModalHook.isOpen}
        toggleOpen={newUserModalHook.toggleOpen}
        refetchName="users"
      />
      {deleteUserModalHook.data && (
        <ModalDeleteUser
          user={deleteUserModalHook.data}
          isOpen={deleteUserModalHook.isOpen}
          toggleOpen={deleteUserModalHook.toggleOpen}
          refetchName="users"
        />
      )}
      {editUserModalHook.data && (
        <ModalEditUser
          user={editUserModalHook.data}
          isOpen={editUserModalHook.isOpen}
          toggleOpen={editUserModalHook.toggleOpen}
          refetchName="users"
        />
      )}
      <Breadcrumb paths={[["Users", "/admin/users"]]} />
      <Table {...tableProps} />
    </Layout>
  );
};

export default Users;
