import type { AppProps } from "next/app";
import { IconContext } from "@react-icons/all-files";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const textColor = "#7bae8c";

  return (
    <IconContext.Provider value={{ color: textColor }}>
      <Component {...pageProps} />
    </IconContext.Provider>
  );
}
