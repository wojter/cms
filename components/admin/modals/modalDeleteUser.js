import React from "react";
import { Modal as ModalFL, Button } from "flowbite-react";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Router from "next/router";

const ModalDeleteUser = ({ user, isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const userId = e.target["id"].value;

      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setToast("User account successfully deleted");
        if (refetchName === "users") {
          refetch(refetchName);
        } else {
          Router.push("/admin/users");
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
        "An unexpected error happened occurred while deleting user account",
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
              id="delete-user-form"
              onSubmit={handleSubmit}
              className="text-center"
            >
              <input type="hidden" name="id" value={user._id.toString()} />
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user account with
                associated posts, comments, and reactions?
              </h3>
              <div className="flex justify-around">
                <Button onClick={toggleOpen}>Cancel</Button>
                <Button color="failure" type="submit" form="delete-user-form">
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

export default ModalDeleteUser;
