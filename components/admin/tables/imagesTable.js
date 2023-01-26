import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import {
  HiOutlineChevronRight,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import useModal from "../hooks/useModal";
import ModalDeleteImage from "../modals/modalDeleteImage";
import ModalEditImage from "../modals/modalEditImage";
import ModalNewImage from "../modals/modalNewImage";
import Table from "../table";

const ImagesTable = ({
  title = null,
  otherUrlOptions = null,
  columnsToOmit = null,
}) => {
  const newImageModalHook = useModal();
  const editImageModalHook = useModal();
  const deleteImageModalHook = useModal();

  const headers = ["id", "user", "slug", "image", "created", "modified"];

  const getColumnsIdsToOmit = () => {
    if (Array.isArray(columnsToOmit)) {
      return columnsToOmit.map((column) => headers.indexOf(column));
    } else {
      return [];
    }
  };

  const columnsIdsToOmit = getColumnsIdsToOmit();

  const filterColumns = (_, id) => !columnsIdsToOmit.includes(id);

  const tableProps = {
    title: title ?? "Images",
    refetchName: "images",
    apiPath: "images",
    otherUrlOptions: otherUrlOptions ?? "",
    headers: headers.filter(filterColumns),
    headerTypes: [
      "string",
      "link:user",
      "string",
      "image",
      "date",
      "date",
    ].filter(filterColumns),
    dataMapper: (image) =>
      [
        image._id,
        image.user_id?.email,
        image.slug,
        image.url,
        image.created,
        image.modified,
      ].filter(filterColumns),
    links: {
      user: {
        linkPrototype: "users/user-details?id=__user_id__",
        linkParams: [["__user_id__", "user_id", "_id"]],
      },
    },
    topButtons: () => (
      <>
        <Button
          onClick={() => {
            newImageModalHook.toggleOpen();
          }}
          color="success"
          className="whitespace-nowrap"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Image
        </Button>
      </>
    ),
    actionButtons: (image) => {
      return (
        <>
          <button
            onClick={() => {
              deleteImageModalHook.setData(image);
              deleteImageModalHook.toggleOpen();
            }}
            className="w-5 h-5 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
          >
            <HiTrash className="w-full h-full" />
          </button>
          <button
            onClick={() => {
              editImageModalHook.setData(image);
              editImageModalHook.toggleOpen();
            }}
            className="w-5 h-5 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
          >
            <HiPencilAlt className="w-full h-full" />
          </button>
          <Link href={`/admin/images/image-details?id=${image._id.toString()}`}>
            <a className="w-5 text-slate-500 hover:text-slate-600 tooltip-details">
              <HiOutlineChevronRight className="w-full h-full" />
            </a>
          </Link>
        </>
      );
    },
  };
  return (
    <>
      <ModalNewImage
        isOpen={newImageModalHook.isOpen}
        toggleOpen={newImageModalHook.toggleOpen}
        refetchName="images"
      />
      {deleteImageModalHook.data && (
        <ModalDeleteImage
          image={deleteImageModalHook.data}
          isOpen={deleteImageModalHook.isOpen}
          toggleOpen={deleteImageModalHook.toggleOpen}
          refetchName="images"
        />
      )}
      {editImageModalHook.data && (
        <ModalEditImage
          image={editImageModalHook.data}
          isOpen={editImageModalHook.isOpen}
          toggleOpen={editImageModalHook.toggleOpen}
          refetchName="images"
        />
      )}
      <Table {...tableProps} />
    </>
  );
};

export default ImagesTable;
