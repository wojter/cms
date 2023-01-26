import { Modal as ModalFL } from "flowbite-react";
import LookupTable from "../lookupTable";

const ModalLookupTable = ({ isOpen, toggleOpen, tableProps }) => {
  return (
    <>
      {isOpen && (
        <ModalFL show={isOpen} size="7xl" popup={true} onClose={toggleOpen}>
          <ModalFL.Header />
          <ModalFL.Body>
            <div className="w-full p-4  text-white flex flex-col gap-4">
              <LookupTable {...tableProps} />
            </div>
          </ModalFL.Body>
        </ModalFL>
      )}
    </>
  );
};

export default ModalLookupTable;
