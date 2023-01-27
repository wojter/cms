import { ThemeProvider } from "next-themes";
import { ToastProvider } from "../components/admin/providers/toastProvider";
import { RefetchProvider } from "../components/admin/providers/refetchProvider";
import { DataProvider } from "../components/admin/providers/dataProvider";
import { PostCategoriesProvider } from "../components/admin/providers/postCategoriesProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <RefetchProvider>
        <DataProvider>
          <PostCategoriesProvider>
            <Component {...pageProps} />
          </PostCategoriesProvider>
        </DataProvider>
      </RefetchProvider>
    </ToastProvider>
  );
}

export default MyApp;
