import { ThemeProvider } from "next-themes";
import { ToastProvider } from "../components/admin/providers/toastProvider";
import { RefetchProvider } from "../components/admin/providers/refetchProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <RefetchProvider>
        <ThemeProvider attribute="class">
        <Component {...pageProps} />
        </ThemeProvider>
      </RefetchProvider>
    </ToastProvider>
  );
}

export default MyApp;
