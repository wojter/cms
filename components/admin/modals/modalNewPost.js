import {
  Modal as ModalFL,
  Button,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle, HiTable, HiX } from "react-icons/hi";
import useModal from "../hooks/useModal";
import { useData } from "../providers/dataProvider";
import { useRefetch } from "../providers/refetchProvider";
import { useToast } from "../providers/toastProvider";
import ModalDetails from "./modalDetails";
import ModalLookupTable from "./modalLookupTable";

const ModalNewPost = ({ isOpen, toggleOpen, refetchName }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const body = {
        title: e.target["title"].value,
        user_id: e.target["user_id"].value,
        category_id: e.target["category_id"].value,
        body: e.target["body"].value,
      };
      if (!body.user_id) {
        setToast("Please provide user id", false);
        return;
      }
      const res = await fetch("/api/admin/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("New post created successfully");
        refetch(refetchName);
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log(error);
      setToast("An unexpected error occurred while creating new post", false);
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
      <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
        <ModalFL.Header>New Post</ModalFL.Header>
        <ModalFL.Body>
          <form
            id="new-post-form"
            onSubmit={handleSubmit}
            className="space-y-6 px-6 lg:px-8"
          >
            <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
              <Label htmlFor="title" value="Title" />
              <TextInput
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                required={true}
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
              <select
                name="category_id"
                id="category_id"
                required
                defaultValue={""}
                className="bg-gray-700 rounded-lg border-gray-600 text-sm text-white invalid:text-gray-400"
              >
                <option value="" disabled>
                  Category
                </option>
                {additionalData?.postCategories &&
                  additionalData?.postCategories.map((category, id) => (
                    <option
                      key={id}
                      value={category._id.toString()}
                      className="text-white"
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
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
              />
            </div>
          </form>
        </ModalFL.Body>
        <ModalFL.Footer className="justify-between">
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button type="submit" form="new-post-form" color="success">
            Create Post
          </Button>
        </ModalFL.Footer>
      </ModalFL>
    </>
  );
};

export default ModalNewPost;
