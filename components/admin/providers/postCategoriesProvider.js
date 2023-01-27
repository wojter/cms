import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export function PostCategoriesProvider({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const [postCategories, setPostCategories] = useState(null);
  const getPostCategories = async () => {
    const res = await fetch(`/api/front/postcategories`);
    const data = await res.json();
    setPostCategories(data);
    return data;
  }
  return {
    postCategories,
    setPostCategories,
    getPostCategories
  };
}
