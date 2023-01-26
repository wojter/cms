import {
  Modal as ModalFL,
  Button,
  Label,
  TextInput,
  Spinner,
} from "flowbite-react";
import { useRef, useState } from "react";
import { HiInformationCircle, HiTable, HiX } from "react-icons/hi";
import useModal from "../hooks/useModal";
import { useRefetch } from "../providers/refetchProvider";
import { useToast } from "../providers/toastProvider";
import ModalDetails from "./modalDetails";
import ModalLookupTable from "./modalLookupTable";

const ModalNewImage = ({ isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();

  const usersTableModalHook = useModal();
  const userDetailsModalHook = useModal();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

  const [imageSrc, setImageSrc] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const fileRef = useRef();

  const setDataAndQuit = (data, input) => {
    if (input === "lookup-users") {
      setUser(data);
      setUserId(data._id.toString());
      usersTableModalHook.toggleOpen();
    }
  };

  const resetImage = () => {
    setImageSrc("");
    fileRef.current.value = "";
  };

  const handleOnChange = (ev) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    if (ev?.target?.files) {
      reader.readAsDataURL(ev.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    const body = {
      user_id: e.target["user_id"].value,
      slug: e.target["slug"].value,
    };

    if (!body.user_id) {
      setToast("Please provide user id", false);
      return;
    }
    if (!body.slug) {
      setToast("Please provide slug", false);
      return;
    }

    const formData = new FormData();

    formData.append("file", fileRef.current.files[0]);

    formData.append("upload_preset", "uploads");

    try {
      let data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      data = await data.json();
      setImageSrc(data.secure_url);

      body.url = data.secure_url;
      body.public_id = data.public_id;

      const res = await fetch("/api/admin/images/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("New image created successfully");
        refetch(refetchName);
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
      toggleOpen();
      setUploadLoading(false);
      setUser(null);
      setUserId("");
      e.target["user_id"].value = "";
      e.target["slug"].value = "";
      setImageSrc("");
      fileRef.current.value = "";
    } catch (error) {
      toggleOpen();
      setUploadLoading(false);
      console.log(error);
      setToast("An unexpected error occurred while creating new image", false);
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
        <ModalFL.Header>New Image</ModalFL.Header>
        <ModalFL.Body>
          <form
            id="new-image-form"
            onSubmit={handleSubmit}
            onChange={handleOnChange}
            className="space-y-6 px-6 lg:px-8"
          >
            <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
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

              <Label htmlFor="slug" value="Slug" />
              <TextInput
                id="slug"
                name="slug"
                placeholder="Slug"
                type="text"
                required={true}
              />

              <Label htmlFor="image" value="Image" />
              <input
                ref={fileRef}
                id="image"
                name="image"
                type="file"
                required={true}
                accept="image/*"
                className="block w-full text-smborder rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
              />
              {/* empty div for good grid formating */}
              <div></div>

              {imageSrc && (
                <div className="relative">
                  <img src={imageSrc} className="max-h-[300px]" />
                  <div
                    onClick={resetImage}
                    className="bg-gray-500 absolute rounded-full top-2 right-2 text-white p-1 hover:cursor-pointer hover:bg-gray-600"
                  >
                    <HiX />
                  </div>
                </div>
              )}
            </div>
          </form>
        </ModalFL.Body>
        <ModalFL.Footer className="justify-between">
          <Button onClick={toggleOpen}>Cancel</Button>

          <div className="flex flex-row gap-2 items-center">
            {uploadLoading && <Spinner />}
            <Button
              type="submit"
              form="new-image-form"
              color="success"
              disabled={uploadLoading}
            >
              Upload Image
            </Button>
          </div>
        </ModalFL.Footer>
      </ModalFL>
    </>
  );
};

export default ModalNewImage;
