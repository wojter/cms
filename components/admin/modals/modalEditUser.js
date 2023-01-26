import React from "react";
import {
  Modal as ModalFL,
  Button,
  Label,
  TextInput,
  Checkbox,
} from "flowbite-react";
import moment from "moment";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";

const ModalEditUser = ({ user, isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const body = {
        id: e.target["id"].value,
        email: e.target["email"].value,
        username: e.target["username"].value,
        is_admin: e.target["is_admin"].checked,
        created: e.target["created"].value,
        modified: e.target["modified"].value,
      };
      const res = await fetch("/api/admin/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("User profile successfully updated");
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
        "An unexpected error occurred while updating user profile",
        false
      );
    }
  };
  return (
    <>
      {isOpen && (
        <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
          <ModalFL.Header>User Profile</ModalFL.Header>
          <ModalFL.Body>
            <form
              id="edit-user-form"
              onSubmit={handleSubmit}
              className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
            >
              <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
                <Label htmlFor="id" value="ID" />
                <input type="hidden" name="id" value={user._id} />
                <p className="text-gray-500 py-2">{user._id}</p>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required={true}
                  defaultValue={user.email}
                />
                <Label htmlFor="username" value="Username" />
                <TextInput
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text"
                  required={true}
                  defaultValue={user.username}
                />
                <Label htmlFor="is_admin" value="Is Admin" />
                <Checkbox
                  id="is_admin"
                  name="is_admin"
                  className="my-2.5"
                  defaultChecked={user.is_admin}
                />
                <Label htmlFor="created" value="Created" />
                <TextInput
                  id="created"
                  name="created"
                  type="datetime-local"
                  defaultValue={moment(user.created).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
                <Label htmlFor="modified" value="Last modified" />
                <TextInput
                  id="modified"
                  name="modified"
                  type="datetime-local"
                  defaultValue={moment(user.modified).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
              </div>
            </form>
          </ModalFL.Body>
          <ModalFL.Footer className="justify-between">
            <Button onClick={toggleOpen}>Cancel</Button>
            <Button color="success" type="submit" form="edit-user-form">
              Update Profile
            </Button>
          </ModalFL.Footer>
        </ModalFL>
      )}
    </>
  );
};

export default ModalEditUser;
