import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiDocumentAdd,
} from "react-icons/hi";
import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import ModalNewPost from "../../../components/admin/modals/modalNewPost";
import ModalEditPost from "../../../components/admin/modals/modalEditPost";
import ModalDeletePost from "../../../components/admin/modals/modalDeletePost";
import Table from "../../../components/admin/table";
import Tabs from "../../../components/admin/tabs";
import { Button } from "flowbite-react";
import useModal from "../../../components/admin/hooks/useModal";

const Posts = () => {
  const newPostModalHook = useModal();
  const editPostModalHook = useModal();
  const deletePostModalHook = useModal();

  const tableProps = {
    title: "Posts",
    refetchName: "posts",
    apiPath: "posts",
    headers: ["id", "title", "user", "category", "created", "modified"],
    headerTypes: [
      "string",
      "string",
      "link:user",
      "link:category",
      "date",
      "date",
    ],
    dataMapper: (post) => [
      post._id,
      post.title,
      post.user_id?.email,
      post.category_id?.name,
      post.created,
      post.modified,
    ],
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
    <Layout active={"Posts"}>
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
      <Tabs
        active="Posts"
        tabs={[
          ["Posts", "/admin/posts"],
          ["Post Categories", "/admin/posts/categories"],
        ]}
      />
      <Breadcrumb paths={[["Posts", "/admin/posts"]]} />
      <Table {...tableProps} />
    </Layout>
  );
};

export default Posts;
