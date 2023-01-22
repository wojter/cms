import React from "react";
import { Modal as ModalFL } from "flowbite-react";
import { useToast } from "../providers/toastProvider";
import { useRefetch } from "../providers/refetchProvider";

import dynamic from "next/dynamic";

const ModalEditPostContent = ({ post, isOpen, toggleOpen }) => {

  const RichEditor = dynamic(() => import("../richEditor"), { ssr: false });

  return (
    <>
      {isOpen && (
        <ModalFL show={isOpen} size="7xl" popup={true} onClose={toggleOpen}>
          <ModalFL.Header />
          <ModalFL.Body>{post && <RichEditor post={post} wrapperToggleOpen={toggleOpen} />}</ModalFL.Body>
        </ModalFL>
      )}
    </>
  );
};

export default ModalEditPostContent;
