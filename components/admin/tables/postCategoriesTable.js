import Link from "next/link";
import { Button } from "flowbite-react";
import React from "react";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import ModalDeletePostCategory from "../modals/modalDeletePostCategory";
import ModalEditPostCategory from "../modals/modalEditPostCategory";
import ModalNewPostCategory from "../modals/modalNewPostCategory";
import Table from "../table";

const PostCategoriesTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newPostCategoryModalHook = useModal();
  const editPostCategoryModalHook = useModal();
  const deletePostCategoryModalHook = useModal();

  const headers = ["id", "name", "created", "modified"];

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
    title: title ?? "Post Categories",
    refetchName: "posts/categories",
    apiPath: "posts/categories",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: ["string", "string", "date", "date"].filter(filterColumns),
    dataMapper: (postCategory) =>
      [
        postCategory._id,
        postCategory.name,
        postCategory.created,
        postCategory.modified,
      ].filter(filterColumns),
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
    <>
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
      <Table {...tableProps} />
    </>
  );
};

export default PostCategoriesTable;
