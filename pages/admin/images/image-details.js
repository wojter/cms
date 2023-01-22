import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../components/admin/title";
import ModalEditImage from "../../../components/admin/modals/modalEditImage";
import ModalDeleteImage from "../../../components/admin/modals/modalDeleteImage";
import { useRefetch } from "../../../components/admin/providers/refetchProvider";
import useModal from "../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../components/admin/form";
import { useToast } from "../../../components/admin/providers/toastProvider";

const ImageDetails = () => {
  const [image, setImage] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: imageId } = router.query;

  const editImageModalHook = useModal();
  const deleteImageModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "image") {
        fetchImage();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/images");
    } else if (imageId) {
      fetchImage();
    }
  }, [imageId]);

  const fetchImage = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/images/${imageId}`);
      if (res.status === 200) {
        const image = await res.json();
        setImage(image);
        editImageModalHook.setData(image);
        deleteImageModalHook.setData(image);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/images");

        throw new Error(await res.text());
      }
    } catch (err) {
      setDataLoading(false);
      console.log(err);
      setToast("An error occured while fetching data", false);
    }
  };

  const formData = [
    ["ID", "_id", "string"],
    ["User", ["user_id", "email"], "link:user"],
    ["Slug", "slug", "string"],
    ["Url", "url", "string"],
    ["Created", "created", "date"],
    ["Last modified", "modified", "date"],
  ];

  const links = {
    user: {
      linkPrototype: "users/user-details?id=__user_id__",
      linkParams: [["__user_id__", (object) => object.user_id._id.toString()]],
    },
  };

  const titleButtons = () => (
    <>
      <button
        onClick={deleteImageModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editImageModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Images"}>
      {editImageModalHook.data && (
        <ModalEditImage
          image={editImageModalHook.data}
          isOpen={editImageModalHook.isOpen}
          toggleOpen={editImageModalHook.toggleOpen}
          refetchName="image"
        />
      )}
      {deleteImageModalHook.data && (
        <ModalDeleteImage
          image={deleteImageModalHook.data}
          isOpen={deleteImageModalHook.isOpen}
          toggleOpen={deleteImageModalHook.toggleOpen}
          refetchName="image"
        />
      )}

      <Breadcrumb
        paths={[
          ["Images", "/admin/images"],
          ["Image Details", `/admin/images/image-details?id=${imageId}`],
        ]}
      />
      <Title
        text="Image Details"
        buttons={titleButtons}
        returnPath="/admin/images"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !image ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={image} links={links} />
      )}
      <p className="text-4xl">Image:</p>
      {image && (
        <div className="bg-gray-500 w-[500px]">
          <img src={image.url} alt={image.slug} className="w-[500px]" />
        </div>
      )}
    </Layout>
  );
};

export default ImageDetails;
