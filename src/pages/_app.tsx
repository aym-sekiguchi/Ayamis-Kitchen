import Layout from "@/components/layouts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kaisei_Decol } from "next/font/google";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

const kaiseiDecol = Kaisei_Decol({ weight: ["400", "500"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  // Google Tag Manager start
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-W4PM9BQ" });
  }, []);

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);
  // Google Tag Manager end
  return (
    <>
      <style jsx global>{`
        .kaisei-decol {
          font-family: ${kaiseiDecol.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
