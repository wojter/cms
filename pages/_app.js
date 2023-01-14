import { ToastProvider } from "../components/admin/providers/toastProvider";
import { RefetchProvider } from "../components/admin/providers/refetchProvider";
import { DataProvider } from "../components/admin/providers/dataProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <RefetchProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </RefetchProvider>
    </ToastProvider>
  );
}

export default MyApp;
