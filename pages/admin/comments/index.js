import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiDocumentAdd,
  HiPlus,
} from "react-icons/hi";
import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import ModalNewComment from "../../../components/admin/modals/modalNewComment";
import ModalEditComment from "../../../components/admin/modals/modalEditComment";
import ModalDeleteComment from "../../../components/admin/modals/modalDeleteComment";
import Table from "../../../components/admin/table";
import { Button } from "flowbite-react";
import useModal from "../../../components/admin/hooks/useModal";

const Comments = () => {
  const newCommentModalHook = useModal();
  const editCommentModalHook = useModal();
  const deleteCommentModalHook = useModal();

  const tableProps = {
    title: "Comments",
    refetchName: "comments",
    apiPath: "comments",
    headers: ["id", "user", "post", "body", "created", "modified"],
    headerTypes: ["string", "link:user", "link:post", "string", "date", "date"],
    dataMapper: (comment) => [
      comment._id,
      comment.user_id?.email,
      comment.post_id?.title,
      comment.body,
      comment.created,
      comment.modified,
    ],
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
    <Layout active={"Comments"}>
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
      <Breadcrumb paths={[["Comments", "/admin/comments"]]} />
      <Table {...tableProps} />
    </Layout>
  );
};

export default Comments;
