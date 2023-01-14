import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiDocumentAdd,
  HiPlus,
} from "react-icons/hi";
import Breadcrumb from "../../../../components/admin/breadcrumb";
import Layout from "../../../../components/admin/layout";
import ModalNewPostCategory from "../../../../components/admin/modals/modalNewPostCategory";
import ModalEditPostCategory from "../../../../components/admin/modals/modalEditPostCategory";
import ModalDeletePostCategory from "../../../../components/admin/modals/modalDeletePostCategory";
import Table from "../../../../components/admin/table";
import Tabs from "../../../../components/admin/tabs";
import { Button } from "flowbite-react";
import useModal from "../../../../components/admin/hooks/useModal";

const PostCategories = () => {
  const newPostCategoryModalHook = useModal();
  const editPostCategoryModalHook = useModal();
  const deletePostCategoryModalHook = useModal();

  const tableProps = {
    title: "Post Categories",
    refetchName: "posts/categories",
    apiPath: "posts/categories",
    headers: ["id", "name", "created", "modified"],
    headerTypes: ["string", "string", "date", "date"],
    dataMapper: (postCategory) => [
      postCategory._id,
      postCategory.name,
      postCategory.created,
      postCategory.modified,
    ],
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newPostCategoryModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Post Category
        </Button>
      </>
    ),
    actionButtons: (category) => (
      <>
        <button
          onClick={() => {
            deletePostCategoryModalHook.setData(category);
            deletePostCategoryModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
        >
          <HiTrash className="w-full h-full" />
        </button>
        <button
          onClick={() => {
            editPostCategoryModalHook.setData(category);
            editPostCategoryModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
        >
          <HiPencilAlt className="w-full h-full" />
        </button>
        <Link
          href={`/admin/posts/categories/category-details?id=${category._id.toString()}`}
        >
          <a className="w-5 text-slate-500 hover:text-slate-600 tooltip-details">
            <HiOutlineChevronRight className="w-full h-full" />
          </a>
        </Link>
      </>
    ),
  };
  return (
    <Layout active={"Posts"}>
      <ModalNewPostCategory
        isOpen={newPostCategoryModalHook.isOpen}
        toggleOpen={newPostCategoryModalHook.toggleOpen}
        refetchName="posts/categories"
      />
      {deletePostCategoryModalHook.data && (
        <ModalDeletePostCategory
          postCategory={deletePostCategoryModalHook.data}
          isOpen={deletePostCategoryModalHook.isOpen}
          toggleOpen={deletePostCategoryModalHook.toggleOpen}
          refetchName="posts/categories"
        />
      )}
      {editPostCategoryModalHook.data && (
        <ModalEditPostCategory
          postCategory={editPostCategoryModalHook.data}
          isOpen={editPostCategoryModalHook.isOpen}
          toggleOpen={editPostCategoryModalHook.toggleOpen}
          refetchName="posts/categories"
        />
      )}
      <Tabs
        active="Post Categories"
        tabs={[
          ["Posts", "/admin/posts"],
          ["Post Categories", "/admin/posts/categories"],
        ]}
      />
      <Breadcrumb
        paths={[
          ["Posts", "/admin/posts"],
          ["Categories", "/admin/posts/categories"],
        ]}
      />
      <Table {...tableProps} />
    </Layout>
  );
};

export default PostCategories;
