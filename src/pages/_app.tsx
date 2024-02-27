import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />
    </ThemeProvider>
  );
}
