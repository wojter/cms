import React from "react";
import { Modal as ModalFL, Button, Label, TextInput } from "flowbite-react";
import moment from "moment";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";

const ModalEditReactionCategory = ({
  reactionCategory,
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
      const body = {
        id: e.target["id"].value,
        name: e.target["name"].value,
        created: e.target["created"].value,
        modified: e.target["modified"].value,
      };
      const res = await fetch("/api/admin/reactions/categories/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("Reaction category successfully updated");
        refetch(refetchName);
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast(
        "An unexpected error happened occurred while updating reaction category",
        false
      );
    }
  };

  return (
    <>
      {isOpen && (
        <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
          <ModalFL.Header>Reaction Category</ModalFL.Header>
          <ModalFL.Body>
            <form
              id="edit-reaction-category-form"
              onSubmit={handleSubmit}
              className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
            >
              <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
                <Label htmlFor="id" value="ID" />
                <input type="hidden" name="id" value={reactionCategory._id} />
                <p className="text-gray-500 py-2">{reactionCategory._id}</p>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required={true}
                  defaultValue={reactionCategory.name}
                />
                <Label htmlFor="created" value="Created" />
                <TextInput
                  id="created"
                  name="created"
                  type="datetime-local"
                  defaultValue={moment(reactionCategory.created).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
                <Label htmlFor="modified" value="Last modified" />
                <TextInput
                  id="modified"
                  name="modified"
                  type="datetime-local"
                  defaultValue={moment(reactionCategory.modified).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
              </div>
            </form>
          </ModalFL.Body>
          <ModalFL.Footer className="justify-between">
            <Button onClick={toggleOpen}>Cancel</Button>
            <Button
              color="success"
              type="submit"
              form="edit-reaction-category-form"
            >
              Update Reaction Category
            </Button>
          </ModalFL.Footer>
        </ModalFL>
      )}
    </>
  );
};

export default ModalEditReactionCategory;
