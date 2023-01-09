import { ToastProvider } from "../components/admin/providers/toastProvider";
import { RefetchProvider } from "../components/admin/providers/refetchProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <RefetchProvider>
        <Component {...pageProps} />
      </RefetchProvider>
    </ToastProvider>
  );
}

export default MyApp;
