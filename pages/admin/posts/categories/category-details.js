import Breadcrumb from "../../../../components/admin/breadcrumb";
import Layout from "../../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../../components/admin/title";
import ModalEditPostCategory from "../../../../components/admin/modals/modalEditPostCategory";
import ModalDeletePostCategory from "../../../../components/admin/modals/modalDeletePostCategory";
import { useRefetch } from "../../../../components/admin/providers/refetchProvider";
import useModal from "../../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../../components/admin/form";
import { useToast } from "../../../../components/admin/providers/toastProvider";

const PostCategoryDetails = () => {
  const [postCategory, setPostCategory] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: postCategoryId } = router.query;

  const editPostCategoryModalHook = useModal();
  const deletePostCategoryModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "post-category") {
        fetchPostCategory();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/posts/categories");
    } else if (postCategoryId) {
      fetchPostCategory();
    }
  }, [postCategoryId]);

  const fetchPostCategory = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/posts/categories/${postCategoryId}`);
      if (res.status === 200) {
        const postCategory = await res.json();
        setPostCategory(postCategory);
        editPostCategoryModalHook.setData(postCategory);
        deletePostCategoryModalHook.setData(postCategory);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/posts/categories");

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
        onClick={deletePostCategoryModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editPostCategoryModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Posts"}>
      {editPostCategoryModalHook.data && (
        <ModalEditPostCategory
          postCategory={editPostCategoryModalHook.data}
          isOpen={editPostCategoryModalHook.isOpen}
          toggleOpen={editPostCategoryModalHook.toggleOpen}
          refetchName="post-category"
        />
      )}
      {deletePostCategoryModalHook.data && (
        <ModalDeletePostCategory
          postCategory={deletePostCategoryModalHook.data}
          isOpen={deletePostCategoryModalHook.isOpen}
          toggleOpen={deletePostCategoryModalHook.toggleOpen}
          refetchName="post-category"
        />
      )}
      <Breadcrumb
        paths={[
          ["Posts", "/admin/posts"],
          ["Categories", "/admin/posts/categories"],
          [
            "Category Details",
            `/admin/posts/categories/category-details?id=${postCategoryId}`,
          ],
        ]}
      />
      <Title
        text="Post Category Details"
        buttons={titleButtons}
        returnPath="/admin/posts/categories"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !postCategory ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={postCategory} />
      )}
    </Layout>
  );
};

export default PostCategoryDetails;
