import { Button } from "flowbite-react";
import React from "react";
import {
  HiDocumentAdd,
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import ModalDeletePost from "../modals/modalDeletePost";
import ModalEditPost from "../modals/modalEditPost";
import ModalNewPost from "../modals/modalNewPost";
import Table from "../table";
import Link from "next/link";

const PostsTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newPostModalHook = useModal();
  const editPostModalHook = useModal();
  const deletePostModalHook = useModal();

  const headers = ["id", "title", "user", "category", "created", "modified"];

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
    title: title ?? "Posts",
    refetchName: "posts",
    apiPath: "posts",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: [
      "string",
      "string",
      "link:user",
      "link:category",
      "date",
      "date",
    ].filter(filterColumns),
    dataMapper: (post) =>
      [
        post._id,
        post.title,
        post.user_id?.email,
        post.category_id?.name,
        post.created,
        post.modified,
      ].filter(filterColumns),
    links: {
      user: {
        linkPrototype: "users/user-details?id=__user_id__",
        linkParams: [["__user_id__", "user_id", "_id"]],
      },
      category: {
        linkPrototype: "posts/categories/category-details?id=__category_id__",
        linkParams: [["__category_id__", "category_id", "_id"]],
      },
    },
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newPostModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiDocumentAdd className="w-5 h-5 mr-2" />
          New Post
        </Button>
      </>
    ),
    actionButtons: (post) => (
      <>
        <button
          onClick={() => {
            deletePostModalHook.setData(post);
            deletePostModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
        >
          <HiTrash className="w-full h-full" />
        </button>
        <button
          onClick={() => {
            editPostModalHook.setData(post);
            editPostModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
        >
          <HiPencilAlt className="w-full h-full" />
        </button>
        <Link href={`/admin/posts/post-details?id=${post._id.toString()}`}>
          <a className="w-5 text-slate-500 hover:text-slate-600 tooltip-details">
            <HiOutlineChevronRight className="w-full h-full" />
          </a>
        </Link>
      </>
    ),
  };

  return (
    <>
      <ModalNewPost
        isOpen={newPostModalHook.isOpen}
        toggleOpen={newPostModalHook.toggleOpen}
        refetchName="posts"
      />
      {deletePostModalHook.data && (
        <ModalDeletePost
          post={deletePostModalHook.data}
          isOpen={deletePostModalHook.isOpen}
          toggleOpen={deletePostModalHook.toggleOpen}
          refetchName="posts"
        />
      )}
      {editPostModalHook.data && (
        <ModalEditPost
          post={editPostModalHook.data}
          isOpen={editPostModalHook.isOpen}
          toggleOpen={editPostModalHook.toggleOpen}
          refetchName="posts"
        />
      )}
      <Table {...tableProps} />
    </>
  );
};

export default PostsTable;
