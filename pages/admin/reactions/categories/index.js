import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiTrash,
  HiDocumentAdd,
  HiPlus,
} from "react-icons/hi";
import Breadcrumb from "../../../../components/admin/breadcrumb";
import Layout from "../../../../components/admin/layout";
import ModalNewReactionCategory from "../../../../components/admin/modals/modalNewReactionCategory";
import ModalEditReactionCategory from "../../../../components/admin/modals/modalEditReactionCategory";
import ModalDeleteReactionCategory from "../../../../components/admin/modals/modalDeleteReactionCategory";
import Table from "../../../../components/admin/table";
import Tabs from "../../../../components/admin/tabs";
import { Button } from "flowbite-react";
import useModal from "../../../../components/admin/hooks/useModal";

const ReactionCategories = () => {
  const newReactionCategoryModalHook = useModal();
  const editReactionCategoryModalHook = useModal();
  const deleteReactionCategoryModalHook = useModal();

  const tableProps = {
    title: "Reaction Categories",
    refetchName: "reactions/categories",
    apiPath: "reactions/categories",
    headers: ["id", "name", "created", "modified"],
    headerTypes: ["string", "string", "date", "date"],
    dataMapper: (reactionCategory) => [
      reactionCategory._id,
      reactionCategory.name,
      reactionCategory.created,
      reactionCategory.modified,
    ],
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
    <Layout active={"Reactions"}>
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
      <Tabs
        active="Reaction Categories"
        tabs={[
          ["Reactions", "/admin/reactions"],
          ["Reaction Categories", "/admin/reactions/categories"],
        ]}
      />
      <Breadcrumb
        paths={[
          ["Reactions", "/admin/reactions"],
          ["Categories", "/admin/reactions/categories"],
        ]}
      />
      <Table {...tableProps} />
    </Layout>
  );
};

export default ReactionCategories;
