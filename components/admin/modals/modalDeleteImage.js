import React from "react";
import { Modal as ModalFL, Button } from "flowbite-react";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Router from "next/router";
import { sha1 } from "crypto-hash";

const ModalDeleteImage = ({ image, isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const imageId = e.target["id"].value;

      const public_id = image.public_id;
      const timestamp = Date.now();
      const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
      const signatureRaw = `public_id=${public_id}&timestamp=${timestamp}${api_secret}`;

      const signature = await sha1(signatureRaw);

      const formData = new FormData();

      formData.append("timestamp", timestamp);
      formData.append("public_id", public_id);
      formData.append("api_key", api_key);
      formData.append("signature", signature);

      let cl_res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: "POST",
          body: formData,
        }
      );

      const { result } = await cl_res.json();

      if (result !== "ok") {
        setToast(`Image service error: ${result}`, false);
        return;
      }

      const res = await fetch(`/api/admin/images/${imageId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setToast("Image successfully deleted");
        if (refetchName === "images") {
          refetch(refetchName);
        } else {
          Router.push("/admin/images");
        }
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast("An unexpected error occurred while deleting image", false);
    }
  };
  return (
    <>
      {isOpen && (
        <ModalFL show={isOpen} size="md" popup={true} onClose={toggleOpen}>
          <ModalFL.Header />
          <ModalFL.Body>
            <form
              id="delete-image-form"
              onSubmit={handleSubmit}
              className="text-center"
            >
              <input type="hidden" name="id" value={image._id.toString()} />
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this image?
              </h3>
              <div className="flex justify-around">
                <Button onClick={toggleOpen}>Cancel</Button>
                <Button color="failure" type="submit" form="delete-image-form">
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

export default ModalDeleteImage;
