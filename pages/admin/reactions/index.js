import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiPlus,
} from "react-icons/hi";
import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import ModalNewReaction from "../../../components/admin/modals/modalNewReaction";
import ModalEditReaction from "../../../components/admin/modals/modalEditReaction";
import ModalDeleteReaction from "../../../components/admin/modals/modalDeleteReaction";
import Table from "../../../components/admin/table";
import { Button } from "flowbite-react";
import useModal from "../../../components/admin/hooks/useModal";
import Tabs from "../../../components/admin/tabs";

const Reactions = () => {
  const newReactionModalHook = useModal();
  const editReactionModalHook = useModal();
  const deleteReactionModalHook = useModal();

  const tableProps = {
    title: "Reactions",
    refetchName: "reactions",
    apiPath: "reactions",
    headers: ["id", "user", "post", "reaction", "created", "modified"],
    headerTypes: [
      "string",
      "link:user",
      "link:post",
      "link:category",
      "date",
      "date",
    ],
    dataMapper: (reaction) => [
      reaction._id,
      reaction.user_id?.email,
      reaction.post_id?.title,
      reaction.category_id?.name,
      reaction.created,
      reaction.modified,
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
      category: {
        linkPrototype:
          "reactions/categories/category-details?id=__category_id__",
        linkParams: [["__category_id__", "category_id", "_id"]],
      },
    },
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newReactionModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Reaction
        </Button>
      </>
    ),
    actionButtons: (reaction) => {
      return (
        <>
          <button
            onClick={() => {
              deleteReactionModalHook.setData(reaction);
              deleteReactionModalHook.toggleOpen();
            }}
            className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
          >
            <HiTrash className="w-full h-full" />
          </button>
          <button
            onClick={() => {
              editReactionModalHook.setData(reaction);
              editReactionModalHook.toggleOpen();
            }}
            className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
          >
            <HiPencilAlt className="w-full h-full" />
          </button>
          <Link
            href={`/admin/reactions/reaction-details?id=${reaction._id.toString()}`}
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
    <Layout active={"Reactions"}>
      <ModalNewReaction
        isOpen={newReactionModalHook.isOpen}
        toggleOpen={newReactionModalHook.toggleOpen}
        refetchName="reactions"
      />
      {deleteReactionModalHook.data && (
        <ModalDeleteReaction
          reaction={deleteReactionModalHook.data}
          isOpen={deleteReactionModalHook.isOpen}
          toggleOpen={deleteReactionModalHook.toggleOpen}
          refetchName="reactions"
        />
      )}
      {editReactionModalHook.data && (
        <ModalEditReaction
          reaction={editReactionModalHook.data}
          isOpen={editReactionModalHook.isOpen}
          toggleOpen={editReactionModalHook.toggleOpen}
          refetchName="reactions"
        />
      )}
      <Tabs
        active="Reactions"
        tabs={[
          ["Reactions", "/admin/reactions"],
          ["Reaction Categories", "/admin/reactions/categories"],
        ]}
      />
      <Breadcrumb paths={[["Reactions", "/admin/reactions"]]} />
      <Table {...tableProps} />
    </Layout>
  );
};

export default Reactions;
