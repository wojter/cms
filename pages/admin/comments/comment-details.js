import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../components/admin/title";
import ModalEditComment from "../../../components/admin/modals/modalEditComment";
import ModalDeleteComment from "../../../components/admin/modals/modalDeleteComment";
import { useRefetch } from "../../../components/admin/providers/refetchProvider";
import useModal from "../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../components/admin/form";
import { useToast } from "../../../components/admin/providers/toastProvider";

const CommentDetails = () => {
  const [comment, setComment] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: commentId } = router.query;

  const editCommentModalHook = useModal();
  const deleteCommentModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "comment") {
        fetchComment();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/comments");
    } else if (commentId) {
      fetchComment();
    }
  }, [commentId]);

  const fetchComment = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/comments/${commentId}`);
      if (res.status === 200) {
        const comment = await res.json();
        setComment(comment);
        editCommentModalHook.setData(comment);
        deleteCommentModalHook.setData(comment);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/comments");

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
    ["User", ["user_id", "email"], "link:user"],
    ["Post", ["post_id", "title"], "link:post"],
    ["Body", "body", "string"],
    ["Created", "created", "date"],
    ["Last modified", "modified", "date"],
  ];
  const links = {
    user: {
      linkPrototype: "users/user-details?id=__user_id__",
      linkParams: [["__user_id__", (object) => object.user_id._id.toString()]],
    },
    post: {
      linkPrototype: "posts/post-details?id=__post_id__",
      linkParams: [["__post_id__", (object) => object.post_id._id.toString()]],
    },
  };

  const titleButtons = () => (
    <>
      <button
        onClick={deleteCommentModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editCommentModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Comments"}>
      {editCommentModalHook.data && (
        <ModalEditComment
          comment={editCommentModalHook.data}
          isOpen={editCommentModalHook.isOpen}
          toggleOpen={editCommentModalHook.toggleOpen}
          refetchName="comment"
        />
      )}
      {deleteCommentModalHook.data && (
        <ModalDeleteComment
          comment={deleteCommentModalHook.data}
          isOpen={deleteCommentModalHook.isOpen}
          toggleOpen={deleteCommentModalHook.toggleOpen}
          refetchName="comment"
        />
      )}
      <Breadcrumb
        paths={[
          ["Comments", "/admin/comments"],
          [
            "Comment Details",
            `/admin/comments/comment-details?id=${commentId}`,
          ],
        ]}
      />
      <Title
        text="Comment Details"
        buttons={titleButtons}
        returnPath="/admin/comments"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !comment ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={comment} links={links} />
      )}
    </Layout>
  );
};

export default CommentDetails;
