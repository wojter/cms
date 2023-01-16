import { Button } from "flowbite-react";
import React from "react";
import {
  HiDocumentAdd,
  HiOutlineChevronRight,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import ModalNewReactionCategory from "../modals/modalNewReactionCategory";
import ModalDeleteReactionCategory from "../modals/modalDeleteReactionCategory";
import ModalEditReactionCategory from "../modals/modalEditReactionCategory";
import Table from "../table";
import Link from "next/link";

const ReactionCategoriesTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newReactionCategoryModalHook = useModal();
  const editReactionCategoryModalHook = useModal();
  const deleteReactionCategoryModalHook = useModal();

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
    title: title ?? "Reaction Categories",
    refetchName: "reactions/categories",
    apiPath: "reactions/categories",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: ["string", "string", "date", "date"].filter(filterColumns),
    dataMapper: (reactionCategory) =>
      [
        reactionCategory._id,
        reactionCategory.name,
        reactionCategory.created,
        reactionCategory.modified,
      ].filter(filterColumns),
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newReactionCategoryModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Reaction Category
        </Button>
      </>
    ),
    actionButtons: (category) => (
      <>
        <button
          onClick={() => {
            deleteReactionCategoryModalHook.setData(category);
            deleteReactionCategoryModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
        >
          <HiTrash className="w-full h-full" />
        </button>
        <button
          onClick={() => {
            editReactionCategoryModalHook.setData(category);
            editReactionCategoryModalHook.toggleOpen();
          }}
          className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
        >
          <HiPencilAlt className="w-full h-full" />
        </button>
        <Link
          href={`/admin/reactions/categories/category-details?id=${category._id.toString()}`}
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
      <ModalNewReactionCategory
        isOpen={newReactionCategoryModalHook.isOpen}
        toggleOpen={newReactionCategoryModalHook.toggleOpen}
        refetchName="reactions/categories"
      />
      {deleteReactionCategoryModalHook.data && (
        <ModalDeleteReactionCategory
          reactionCategory={deleteReactionCategoryModalHook.data}
          isOpen={deleteReactionCategoryModalHook.isOpen}
          toggleOpen={deleteReactionCategoryModalHook.toggleOpen}
          refetchName="reactions/categories"
        />
      )}
      {editReactionCategoryModalHook.data && (
        <ModalEditReactionCategory
          reactionCategory={editReactionCategoryModalHook.data}
          isOpen={editReactionCategoryModalHook.isOpen}
          toggleOpen={editReactionCategoryModalHook.toggleOpen}
          refetchName="reactions/categories"
        />
      )}
      <Table {...tableProps} />
    </>
  );
};

export default ReactionCategoriesTable;
