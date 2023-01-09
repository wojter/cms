import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const resetData = () => {
    setData(null);
  };

  return {
    isOpen,
    toggleOpen,
    data,
    setData,
    resetData,
  };
};

export default useModal;
