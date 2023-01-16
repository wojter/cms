import React, { useEffect, useState } from "react";
import {
  Modal as ModalFL,
  Button,
  Label,
  TextInput,
  Checkbox,
  Textarea,
} from "flowbite-react";
import moment from "moment";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";
import { useData } from "../providers/dataProvider";
import useModal from "../hooks/useModal";
import ModalLookupTable from "./modalLookupTable";
import ModalDetails from "./modalDetails";
import { HiInformationCircle, HiTable, HiX } from "react-icons/hi";

const ModalEditPost = ({ post, isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const { additionalData } = useData();

  const usersTableModalHook = useModal();
  const userDetailsModalHook = useModal();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const setDataAndQuit = (data, input) => {
    if (input === "lookup-users") {
      setUser(data);
      setUserId(data._id.toString());
      usersTableModalHook.toggleOpen();
    }
  };

  useEffect(() => {
    if (post) {
      setUser(post.user_id);
      setUserId(post.user_id._id.toString());
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const body = {
        id: e.target["id"].value,
        title: e.target["title"].value,
        user_id: e.target["user_id"].value,
        category_id: e.target["category_id"].value,
        body: e.target["body"].value,
        created: e.target["created"].value,
        modified: e.target["modified"].value,
      };
      if (!body.user_id) {
        setToast("Please provide user id", false);
        return;
      }
      const res = await fetch("/api/admin/posts/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("Post successfully updated");
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
        "An unexpected error happened occurred while updating post",
        false
      );
    }
  };

  const usersTableProps = {
    title: "Users",
    refetchName: "lookup-users",
    apiPath: "users",
    headers: ["id", "email", "username", "is admin", "created"],
    headerTypes: ["string", "string", "string", "bool", "date"],
    dataMapper: (user) => [
      user._id,
      user.email,
      user.username,
      user.is_admin,
      user.created,
    ],
    setDataAndQuit,
    headerNameToReturnFrom: "id",
  };

  const userDetailsProps = {
    title: "User Details",
    formData: [
      ["ID", "_id", "string"],
      ["Email", "email", "string"],
      ["Username", "username", "string"],
      ["Is Admin", "is_admin", "bool"],
      ["Created", "created", "date"],
      ["Last modified", "modified", "date"],
    ],
  };

  let values = [];
  if (additionalData?.postCategories) {
    values = additionalData.postCategories
      .filter((cat) => cat._id !== post.category_id._id)
      .map((category) => [category._id, category.name]);
    values = [[post.category_id._id, post.category_id.name], ...values];
  }

  return (
    <>
      <ModalLookupTable
        isOpen={usersTableModalHook.isOpen}
        toggleOpen={usersTableModalHook.toggleOpen}
        tableProps={usersTableProps}
      />
      <ModalDetails
        isOpen={userDetailsModalHook.isOpen}
        toggleOpen={userDetailsModalHook.toggleOpen}
        object={user}
        details={userDetailsProps}
      />
      {isOpen && (
        <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
          <ModalFL.Header>Post</ModalFL.Header>
          <ModalFL.Body>
            <form
              id="edit-post-form"
              onSubmit={handleSubmit}
              className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
            >
              <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
                <Label htmlFor="id" value="ID" />
                <input type="hidden" name="id" value={post._id} />
                <p className="text-gray-500 py-2">{post._id}</p>
                <Label htmlFor="title" value="Title" />
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  required={true}
                  defaultValue={post.title}
                />
                <Label htmlFor="user_id" value="User ID" />
                <div className="flex flex-row gap-2 relative">
                  <TextInput
                    id="user_id"
                    name="user_id"
                    placeholder="User ID"
                    type="text"
                    required={true}
                    readOnly={true}
                    className="w-full"
                    value={userId}
                  />
                  <button
                    className="w-6 text-white hover:text-gray-300 absolute h-full right-2"
                    type="button"
                    onClick={() => {
                      usersTableModalHook.toggleOpen();
                    }}
                  >
                    <HiTable className="w-full h-full" />
                  </button>
                  {userId && (
                    <>
                      <button
                        className="w-6 text-blue-500 hover:text-blue-600 absolute h-full -left-8 hover:cursor-pointer"
                        type="button"
                        onClick={userDetailsModalHook.toggleOpen}
                      >
                        <HiInformationCircle className="w-full h-full" />
                      </button>
                      <div className="h-full w-8 absolute top-0 right-8 grid place-items-center">
                        <div
                          onClick={() => {
                            setUserId("");
                            setUser(null);
                          }}
                          className="w-4 text-gray-500 hover:cursor-pointer"
                        >
                          <HiX className="w-full h-full" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Label htmlFor="category_id" value="Category" />
                {additionalData?.postCategories && (
                  <>
                    <select
                      name="category_id"
                      id="category_id"
                      required
                      className="bg-gray-700 rounded-lg border-gray-600 text-sm text-white "
                    >
                      {values.map(([value, text], id) => (
                        <option key={id} value={value}>
                          {text}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <Label htmlFor="created" value="Created" />
                <TextInput
                  id="created"
                  name="created"
                  type="datetime-local"
                  defaultValue={moment(post.created).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
                <Label htmlFor="modified" value="Last modified" />
                <TextInput
                  id="modified"
                  name="modified"
                  type="datetime-local"
                  defaultValue={moment(post.modified).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
                <Label
                  htmlFor="body"
                  value="Body"
                  className="self-start py-2.5"
                />
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Body"
                  required={true}
                  className="h-32 resize-none text-sm"
                  defaultValue={post.body}
                />
              </div>
            </form>
          </ModalFL.Body>
          <ModalFL.Footer className="justify-between">
            <Button onClick={toggleOpen}>Cancel</Button>
            <Button color="success" type="submit" form="edit-post-form">
              Update Post
            </Button>
          </ModalFL.Footer>
        </ModalFL>
      )}
    </>
  );
};

export default ModalEditPost;
