import React from "react";
import { Modal as ModalFL } from "flowbite-react";
import Form from "../form";

const ModalDetails = ({ isOpen, toggleOpen, object, details }) => {
  return (
    <ModalFL show={isOpen} size="lg" popup={true} onClose={toggleOpen}>
      <ModalFL.Header className="!text-xl !p-6 !pb-4">
        {details.title}
      </ModalFL.Header>
      <ModalFL.Body className="text-white">
        {object ? (
          <Form formData={details.formData} object={object} />
        ) : (
          <p className="text-gray-500">No data</p>
        )}
      </ModalFL.Body>
    </ModalFL>
  );
};

export default ModalDetails;
