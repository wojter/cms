import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import ModalDeleteComment from "../modals/modalDeleteComment";
import ModalEditComment from "../modals/modalEditComment";
import ModalNewComment from "../modals/modalNewComment";
import Table from "../table";

const CommentsTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newCommentModalHook = useModal();
  const editCommentModalHook = useModal();
  const deleteCommentModalHook = useModal();

  const headers = ["id", "user", "post", "body", "created", "modified"];

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
    title: title ?? "Comments",
    refetchName: "comments",
    apiPath: "comments",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: [
      "string",
      "link:user",
      "link:post",
      "string",
      "date",
      "date",
    ].filter(filterColumns),
    dataMapper: (comment) =>
      [
        comment._id,
        comment.user_id?.email,
        comment.post_id?.title,
        comment.body,
        comment.created,
        comment.modified,
      ].filter(filterColumns),
    links: {
      user: {
        linkPrototype: "users/user-details?id=__user_id__",
        linkParams: [["__user_id__", "user_id", "_id"]],
      },
      post: {
        linkPrototype: "posts/post-details?id=__post_id__",
        linkParams: [["__post_id__", "post_id", "_id"]],
      },
    },
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newCommentModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Comment
        </Button>
      </>
    ),
    actionButtons: (comment) => {
      return (
        <>
          <button
            onClick={() => {
              deleteCommentModalHook.setData(comment);
              deleteCommentModalHook.toggleOpen();
            }}
            className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
          >
            <HiTrash className="w-full h-full" />
          </button>
          <button
            onClick={() => {
              editCommentModalHook.setData(comment);
              editCommentModalHook.toggleOpen();
            }}
            className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
          >
            <HiPencilAlt className="w-full h-full" />
          </button>
          <Link
            href={`/admin/comments/comment-details?id=${comment._id.toString()}`}
          >
            <a className="w-5 text-slate-500 hover:text-slate-600 tooltip-details">
              <HiOutlineChevronRight className="w-full h-full" />
            </a>
          </Link>
        </>
      );
    },
  };
  return (
    <>
      <ModalNewComment
        isOpen={newCommentModalHook.isOpen}
        toggleOpen={newCommentModalHook.toggleOpen}
        refetchName="comments"
      />
      {deleteCommentModalHook.data && (
        <ModalDeleteComment
          comment={deleteCommentModalHook.data}
          isOpen={deleteCommentModalHook.isOpen}
          toggleOpen={deleteCommentModalHook.toggleOpen}
          refetchName="comments"
        />
      )}
      {editCommentModalHook.data && (
        <ModalEditComment
          comment={editCommentModalHook.data}
          isOpen={editCommentModalHook.isOpen}
          toggleOpen={editCommentModalHook.toggleOpen}
          refetchName="comments"
        />
      )}
      <Table {...tableProps} />
    </>
  );
};

export default CommentsTable;
