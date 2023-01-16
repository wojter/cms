import React from "react";
import { Modal as ModalFL, Button } from "flowbite-react";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Router from "next/router";

const ModalDeleteReaction = ({ reaction, isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const reactionId = e.target["id"].value;

      const res = await fetch(`/api/admin/reactions/${reactionId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setToast("Reaction successfully deleted");
        if (refetchName === "reactions") {
          refetch(refetchName);
        } else {
          Router.push("/admin/reactions");
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
        "An unexpected error happened occurred while deleting reaction",
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
              id="delete-reaction-form"
              onSubmit={handleSubmit}
              className="text-center"
            >
              <input type="hidden" name="id" value={reaction._id.toString()} />
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this reaction?
              </h3>
              <div className="flex justify-around">
                <Button onClick={toggleOpen}>Cancel</Button>
                <Button
                  color="failure"
                  type="submit"
                  form="delete-reaction-form"
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

export default ModalDeleteReaction;
