import { Toast } from "flowbite-react";
import { createContext, useContext, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

const toastContext = createContext();

export function ToastProvider({ children }) {
  const toastData = useProvideToast();

  const { visible, message, isSuccess, setToast, hideToast, toastClasses } =
    toastData;
  return (
    <toastContext.Provider value={toastData}>
      <div className="w-96 fixed z-20 top-4 right-4">
        <Toast
          className={`max-w-none shadow-lg shadow-gray-900 ${
            !visible && "hidden"
          } ${toastClasses}`}
        >
          {isSuccess ? (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
          ) : (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
          )}
          <div className="ml-4 text-sm font-normal mr-1">{message}</div>
          <button
            aria-label="Close"
            type="button"
            onClick={() => {
              hideToast();
            }}
            className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <HiX className="w-5 h-5" />
          </button>
        </Toast>
      </div>
      {children}
    </toastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(toastContext);
};

function useProvideToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [toastClasses, setToastClasses] = useState("");

  const setToast = (message, isSuccess = true) => {
    if (!message) {
      return;
    }
    setToastClasses("opacity-100");
    setMessage(message);
    setIsSuccess(isSuccess);
    setVisible(true);
  };

  const hideToast = () => {
    setToastClasses("opacity-0");
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  return {
    visible,
    message,
    isSuccess,
    setToast,
    hideToast,
    toastClasses,
  };
}
