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
import ModalLookupTable from "./modalLookupTable";
import ModalDetails from "./modalDetails";
import useModal from "../hooks/useModal";
import { HiInformationCircle, HiTable, HiX } from "react-icons/hi";

const ModalEditReaction = ({ reaction, isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const { reactionCategories } = useData();

  const usersTableModalHook = useModal();
  const postsTableModalHook = useModal();
  const userDetailsModalHook = useModal();
  const postDetailsModalHook = useModal();

  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);

  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");

  const setDataAndQuit = (data, input) => {
    if (input === "lookup-users") {
      setUser(data);
      setUserId(data._id.toString());
      usersTableModalHook.toggleOpen();
    } else if (input === "lookup-posts") {
      setPost(data);
      setPostId(data._id.toString());
      postsTableModalHook.toggleOpen();
    }
  };

  useEffect(() => {
    if (reaction) {
      setUser(reaction.user_id);
      setUserId(reaction.user_id._id.toString());
      setPost(reaction.post_id);
      setPostId(reaction.post_id._id.toString());
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const body = {
        id: e.target["id"].value,
        user_id: e.target["user_id"].value,
        post_id: e.target["post_id"].value,
        category_id: e.target["category_id"].value,
        created: e.target["created"].value,
        modified: e.target["modified"].value,
      };
      const res = await fetch("/api/admin/reactions/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("Reaction successfully updated");
        refetch(refetchName);
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast("An unexpected error occurred while updating reaction", false);
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

  const postsTableProps = {
    title: "Posts",
    refetchName: "lookup-posts",
    apiPath: "posts",
    headers: ["id", "title", "category", "created", "modified"],
    headerTypes: ["string", "string", "string", "date", "date"],
    dataMapper: (post) => [
      post._id,
      post.title,
      post.category_id?.name,
      post.created,
      post.modified,
    ],
    setDataAndQuit,
    headerNameToReturnFrom: "id",
  };

  const postDetailsProps = {
    title: "Post Details",
    formData: [
      ["ID", "_id", "string"],
      ["Category", "category_id", "object", "name", "string"],
      ["Title", "title", "string"],
      ["Body", "body", "string"],
      ["Created", "created", "date"],
      ["Last modified", "modified", "date"],
    ],
  };

  let values = [];
  if (reactionCategories) {
    values = reactionCategories
      .filter((cat) => cat._id !== reaction.category_id._id)
      .map((category) => [category._id, category.name]);
    values = [[reaction.category_id._id, reaction.category_id.name], ...values];
  }

  return (
    <>
      <ModalLookupTable
        isOpen={usersTableModalHook.isOpen}
        toggleOpen={usersTableModalHook.toggleOpen}
        tableProps={usersTableProps}
      />
      <ModalLookupTable
        isOpen={postsTableModalHook.isOpen}
        toggleOpen={postsTableModalHook.toggleOpen}
        tableProps={postsTableProps}
      />
      <ModalDetails
        isOpen={userDetailsModalHook.isOpen}
        toggleOpen={userDetailsModalHook.toggleOpen}
        object={user}
        details={userDetailsProps}
      />
      <ModalDetails
        isOpen={postDetailsModalHook.isOpen}
        toggleOpen={postDetailsModalHook.toggleOpen}
        object={post}
        details={postDetailsProps}
      />
      {isOpen && (
        <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
          <ModalFL.Header>Reaction</ModalFL.Header>
          <ModalFL.Body>
            <form
              id="edit-reaction-form"
              onSubmit={handleSubmit}
              className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
            >
              <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
                <Label htmlFor="id" value="ID" />
                <input type="hidden" name="id" value={reaction._id} />
                <p className="text-gray-500 py-2">{reaction._id}</p>
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
                <Label htmlFor="post_id" value="Post ID" />
                <div className="flex flex-row gap-2 relative">
                  <TextInput
                    id="post_id"
                    name="post_id"
                    placeholder="Post ID"
                    type="text"
                    required={true}
                    readOnly={true}
                    className="w-full"
                    value={postId}
                  />
                  <button
                    className="w-6 text-white hover:text-gray-300 absolute h-full right-2"
                    type="button"
                    onClick={() => {
                      postsTableModalHook.toggleOpen();
                    }}
                  >
                    <HiTable className="w-full h-full" />
                  </button>
                  {postId && (
                    <>
                      <button
                        className="w-6 text-blue-500 hover:text-blue-600 absolute h-full -left-8 hover:cursor-pointer"
                        type="button"
                        onClick={postDetailsModalHook.toggleOpen}
                      >
                        <HiInformationCircle className="w-full h-full" />
                      </button>
                      <div className="h-full w-8 absolute top-0 right-8 grid place-items-center">
                        <div
                          onClick={() => {
                            setPostId("");
                            setPost(null);
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

                <Label htmlFor="created" value="Created" />
                <TextInput
                  id="created"
                  name="created"
                  type="datetime-local"
                  defaultValue={moment(reaction.created).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
                <Label htmlFor="modified" value="Last modified" />
                <TextInput
                  id="modified"
                  name="modified"
                  type="datetime-local"
                  defaultValue={moment(reaction.modified).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  step={1}
                />
              </div>
            </form>
          </ModalFL.Body>
          <ModalFL.Footer className="justify-between">
            <Button onClick={toggleOpen}>Cancel</Button>
            <Button color="success" type="submit" form="edit-reaction-form">
              Update Reaction
            </Button>
          </ModalFL.Footer>
        </ModalFL>
      )}
    </>
  );
};

export default ModalEditReaction;
