import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../components/admin/title";
import ModalEditUser from "../../../components/admin/modals/modalEditUser";
import ModalDeleteUser from "../../../components/admin/modals/modalDeleteUser";
import { useRefetch } from "../../../components/admin/providers/refetchProvider";
import useModal from "../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../components/admin/form";
import { useToast } from "../../../components/admin/providers/toastProvider";
import PostsTable from "../../../components/admin/tables/postsTable";
import ImagesTable from "../../../components/admin/tables/imagesTable";
import CommentsTable from "../../../components/admin/tables/commentsTable";
import ReactionsTable from "../../../components/admin/tables/reactionsTable";
import TabsNoRedirect from "../../../components/admin/tabsNoRedirect";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: userId } = router.query;

  const editUserModalHook = useModal();
  const deleteUserModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "user") {
        fetchUser();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/users");
    } else if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/users/${userId}`);
      if (res.status === 200) {
        const user = await res.json();
        setUser(user);
        editUserModalHook.setData(user);
        deleteUserModalHook.setData(user);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/users");

        throw new Error(await res.text());
      }
    } catch (err) {
      setDataLoading(false);
      console.log(err);
      setToast("An error occured while fetching data", false);
    }
  };

  const formData = [
    ["ID", "_id", "string"],
    ["Email", "email", "string"],
    ["Username", "username", "string"],
    ["Is Admin", "is_admin", "bool"],
    ["Created", "created", "date"],
    ["Last modified", "modified", "date"],
  ];

  const titleButtons = () => (
    <>
      <button
        onClick={deleteUserModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editUserModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Users"}>
      {editUserModalHook.data && (
        <ModalEditUser
          user={editUserModalHook.data}
          isOpen={editUserModalHook.isOpen}
          toggleOpen={editUserModalHook.toggleOpen}
          refetchName="user"
        />
      )}
      {deleteUserModalHook.data && (
        <ModalDeleteUser
          user={deleteUserModalHook.data}
          isOpen={deleteUserModalHook.isOpen}
          toggleOpen={deleteUserModalHook.toggleOpen}
          refetchName="user"
        />
      )}

      <Breadcrumb
        paths={[
          ["Users", "/admin/users"],
          ["User Details", `/admin/users/user-details?id=${userId}`],
        ]}
      />
      <Title
        text="User Details"
        buttons={titleButtons}
        returnPath="/admin/users"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !user ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={user} />
      )}

      <TabsNoRedirect
        titles={["Posts", "Comments", "Reactions", "Images"]}
        elements={[
          <PostsTable
            title="Posts"
            otherUrlOptions={`&filter=user_id:${userId}`}
            columnsToOmit={["user"]}
          />,
          <CommentsTable
            title="Comments"
            otherUrlOptions={`&filter=user_id:${userId}`}
            columnsToOmit={["user"]}
          />,
          <ReactionsTable
            title="Reactions"
            otherUrlOptions={`&filter=user_id:${userId}`}
            columnsToOmit={["user"]}
          />,
          <ImagesTable
            title="Images"
            otherUrlOptions={`&filter=user_id:${userId}`}
            columnsToOmit={["user"]}
          />,
        ]}
      />
    </Layout>
  );
};

export default UserDetails;
