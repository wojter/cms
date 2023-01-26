import { Button } from "flowbite-react";
import React from "react";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiUserAdd,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import ModalDeleteUser from "../modals/modalDeleteUser";
import ModalEditUser from "../modals/modalEditUser";
import ModalNewUser from "../modals/modalNewUser";
import Table from "../table";
import Link from "next/link";

const UsersTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newUserModalHook = useModal();
  const editUserModalHook = useModal();
  const deleteUserModalHook = useModal();

  const headers = ["id", "email", "username", "is admin", "created"];
  const getColumnsIdsToOmit = () => {
    if (Array.isArray(columnsToOmit)) {
      return columnsToOmit.map((column) => headers.indexOf(column));
    } else {
      return [];
    }
  };

  const columnsIdsToOmit = getColumnsIdsToOmit();

  const filterColumns = (_, id) => !columnsIdsToOmit.includes(id);

  const tableProps = {
    title: title ?? "Users",
    refetchName: "users",
    apiPath: "users",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: ["string", "string", "string", "bool", "date"].filter(
      filterColumns
    ),
    dataMapper: (user) =>
      [user._id, user.email, user.username, user.is_admin, user.created].filter(
        filterColumns
      ),
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
    <>
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
      <Table {...tableProps} />
    </>
  );
};

export default UsersTable;
