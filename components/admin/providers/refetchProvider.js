import { createContext, useContext, useState } from "react";

const refetchContext = createContext();

export function RefetchProvider({ children }) {
  const refetchData = useProvideRefetch();
  return (
    <refetchContext.Provider value={refetchData}>
      {children}
    </refetchContext.Provider>
  );
}

export const useRefetch = () => {
  return useContext(refetchContext);
};

function useProvideRefetch() {
  const [toRefetch, setToRefetch] = useState("");

  const refetch = (objectName) => {
    if (typeof objectName !== "string") {
      return;
    }
    setToRefetch(objectName);
  };

  const refetchReset = () => {
    setToRefetch("");
  };

  return {
    toRefetch,
    refetch,
    refetchReset,
  };
}
