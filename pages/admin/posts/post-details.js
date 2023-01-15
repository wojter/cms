import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../components/admin/title";
import ModalEditPost from "../../../components/admin/modals/modalEditPost";
import ModalDeletePost from "../../../components/admin/modals/modalDeletePost";
import { useRefetch } from "../../../components/admin/providers/refetchProvider";
import useModal from "../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../components/admin/form";
import { useToast } from "../../../components/admin/providers/toastProvider";
import TabsNoRedirect from "../../../components/admin/tabsNoRedirect";
import CommentsTable from "../../../components/admin/tables/commentsTable";
import ReactionsTable from "../../../components/admin/tables/reactionsTable";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: postId } = router.query;

  const editPostModalHook = useModal();
  const deletePostModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "post") {
        fetchPost();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/posts");
    } else if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/posts/${postId}`);
      if (res.status === 200) {
        const post = await res.json();
        setPost(post);
        editPostModalHook.setData(post);
        deletePostModalHook.setData(post);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/posts");

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
    ["Category", ["category_id", "name"], "link:category"],
    ["Title", "title", "string"],
    ["Created", "created", "date"],
    ["Last modified", "modified", "date"],
    ["Body", "body", "string"],
  ];

  const links = {
    user: {
      linkPrototype: "users/user-details?id=__user_id__",
      linkParams: [["__user_id__", (object) => object.user_id._id.toString()]],
    },
    category: {
      linkPrototype: "posts/categories/category-details?id=__category_id__",
      linkParams: [
        ["__category_id__", (object) => object.category_id._id.toString()],
      ],
    },
  };

  const titleButtons = () => (
    <>
      <button
        onClick={deletePostModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editPostModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Posts"}>
      {editPostModalHook.data && (
        <ModalEditPost
          post={editPostModalHook.data}
          isOpen={editPostModalHook.isOpen}
          toggleOpen={editPostModalHook.toggleOpen}
          refetchName="post"
        />
      )}
      {deletePostModalHook.data && (
        <ModalDeletePost
          post={deletePostModalHook.data}
          isOpen={deletePostModalHook.isOpen}
          toggleOpen={deletePostModalHook.toggleOpen}
          refetchName="post"
        />
      )}
      <Breadcrumb
        paths={[
          ["Posts", "/admin/posts"],
          ["Post Details", `/admin/posts/post-details?id=${postId}`],
        ]}
      />
      <Title
        text="Post Details"
        buttons={titleButtons}
        returnPath="/admin/posts"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !post ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={post} links={links} />
      )}

      <TabsNoRedirect
        titles={["Comments", "Reactions"]}
        elements={[
          <CommentsTable
            title="Comments"
            otherUrlOptions={`&filter=post_id:${postId}`}
            columnsToOmit={["post"]}
          />,
          <ReactionsTable
            title="Reactions"
            otherUrlOptions={`&filter=post_id:${postId}`}
            columnsToOmit={["post"]}
          />,
        ]}
      />
    </Layout>
  );
};

export default PostDetails;
