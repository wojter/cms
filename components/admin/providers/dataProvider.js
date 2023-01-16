import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export function DataProvider({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const [additionalData, setAdditionalData] = useState(null);

  return {
    additionalData,
    setAdditionalData,
  };
}
