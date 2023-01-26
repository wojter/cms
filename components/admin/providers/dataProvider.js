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
  const [postCategories, setPostCategories] = useState(null);
  const [reactionCategories, setReactionCategories] = useState(null);

  return {
    postCategories,
    setPostCategories,
    reactionCategories,
    setReactionCategories,
  };
}
