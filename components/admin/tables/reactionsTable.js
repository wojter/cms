import { Button } from "flowbite-react";
import React from "react";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import Table from "../table";
import Link from "next/link";
import ModalNewReaction from "../modals/modalNewReaction";
import ModalDeleteReaction from "../modals/modalDeleteReaction";
import ModalEditReaction from "../modals/modalEditReaction";

const ReactionsTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newReactionModalHook = useModal();
  const editReactionModalHook = useModal();
  const deleteReactionModalHook = useModal();

  const headers = ["id", "user", "post", "reaction", "created", "modified"];

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
    title: title ?? "Reactions",
    refetchName: "reactions",
    apiPath: "reactions",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: [
      "string",
      "link:user",
      "link:post",
      "link:category",
      "date",
      "date",
    ].filter(filterColumns),
    dataMapper: (reaction) =>
      [
        reaction._id,
        reaction.user_id?.email,
        reaction.post_id?.title,
        reaction.category_id?.name,
        reaction.created,
        reaction.modified,
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
    <>
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
      <Table {...tableProps} />
    </>
  );
};

export default ReactionsTable;
