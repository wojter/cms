import Breadcrumb from "../../../../components/admin/breadcrumb";
import Layout from "../../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../../components/admin/title";
import ModalEditReactionCategory from "../../../../components/admin/modals/modalEditReactionCategory";
import ModalDeleteReactionCategory from "../../../../components/admin/modals/modalDeleteReactionCategory";
import { useRefetch } from "../../../../components/admin/providers/refetchProvider";
import useModal from "../../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../../components/admin/form";
import { useToast } from "../../../../components/admin/providers/toastProvider";

const ReactionCategoryDetails = () => {
  const [reactionCategory, setReactionCategory] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: reactionCategoryId } = router.query;

  const editReactionCategoryModalHook = useModal();
  const deleteReactionCategoryModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "reaction-category") {
        fetchReactionCategory();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/reactions/categories");
    } else if (reactionCategoryId) {
      fetchReactionCategory();
    }
  }, [reactionCategoryId]);

  const fetchReactionCategory = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(
        `/api/admin/reactions/categories/${reactionCategoryId}`
      );
      if (res.status === 200) {
        const reactionCategory = await res.json();
        setReactionCategory(reactionCategory);
        editReactionCategoryModalHook.setData(reactionCategory);
        deleteReactionCategoryModalHook.setData(reactionCategory);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/reactions/categories");

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
    ["Name", "name", "string"],
    ["Created", "created", "date"],
    ["Last modified", "modified", "date"],
  ];

  const titleButtons = () => (
    <>
      <button
        onClick={deleteReactionCategoryModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editReactionCategoryModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Reactions"}>
      {editReactionCategoryModalHook.data && (
        <ModalEditReactionCategory
          reactionCategory={editReactionCategoryModalHook.data}
          isOpen={editReactionCategoryModalHook.isOpen}
          toggleOpen={editReactionCategoryModalHook.toggleOpen}
          refetchName="reaction-category"
        />
      )}
      {deleteReactionCategoryModalHook.data && (
        <ModalDeleteReactionCategory
          reactionCategory={deleteReactionCategoryModalHook.data}
          isOpen={deleteReactionCategoryModalHook.isOpen}
          toggleOpen={deleteReactionCategoryModalHook.toggleOpen}
          refetchName="reaction-category"
        />
      )}
      <Breadcrumb
        paths={[
          ["Reactions", "/admin/reactions"],
          ["Categories", "/admin/reactions/categories"],
          [
            "Category Details",
            `/admin/reactions/categories/category-details?id=${reactionCategoryId}`,
          ],
        ]}
      />
      <Title
        text="Reaction Category Details"
        buttons={titleButtons}
        returnPath="/admin/reactions/categories"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !reactionCategory ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={reactionCategory} />
      )}
    </Layout>
  );
};
ReactionCategoryDetails.theme = 'dark'
export default ReactionCategoryDetails;
