import React from "react";
import { Modal as ModalFL, Button } from "flowbite-react";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Router from "next/router";

const ModalDeletePostCategory = ({
  postCategory,
  isOpen,
  toggleOpen,
  refetchName,
}) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const postCategoryId = e.target["id"].value;

      const res = await fetch(`/api/admin/posts/categories/${postCategoryId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setToast("Post category successfully deleted");
        if (refetchName === "posts/categories") {
          refetch(refetchName);
        } else {
          Router.push("/admin/posts/categories");
        }
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast(
        "An unexpected error occurred while deleting post category",
        false
      );
    }
  };
  return (
    <>
      {isOpen && (
        <ModalFL show={isOpen} size="md" popup={true} onClose={toggleOpen}>
          <ModalFL.Header />
          <ModalFL.Body>
            <form
              id="delete-post-category-form"
              onSubmit={handleSubmit}
              className="text-center"
            >
              <input
                type="hidden"
                name="id"
                value={postCategory._id.toString()}
              />
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post category?
              </h3>
              <div className="flex justify-around">
                <Button onClick={toggleOpen}>Cancel</Button>
                <Button
                  color="failure"
                  type="submit"
                  form="delete-post-category-form"
                >
                  Delete
                </Button>
              </div>
            </form>
          </ModalFL.Body>
        </ModalFL>
      )}
    </>
  );
};

export default ModalDeletePostCategory;
