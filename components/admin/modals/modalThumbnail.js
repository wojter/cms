import React from "react";
import { Modal as ModalFL } from "flowbite-react";

const ModalThumbnail = ({ isOpen, toggleOpen, url }) => {
  return (
    <ModalFL show={isOpen} size="lg" popup={true} onClose={toggleOpen}>
      <ModalFL.Header className="!text-xl !p-6 !pb-4">
        Post thumbnail
      </ModalFL.Header>
      <ModalFL.Body className="text-white">
        <img src={url} alt="thumbnail" />
      </ModalFL.Body>
    </ModalFL>
  );
};

export default ModalThumbnail;
