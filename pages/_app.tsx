import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return(
    <ToastProvider>
      <Component {...pageProps} />
      <Toaster/>
    </ToastProvider>
  ) 
}
