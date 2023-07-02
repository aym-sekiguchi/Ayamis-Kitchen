import Layout from "@/components/layouts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kaisei_Decol } from "next/font/google";

const kaiseiDecol = Kaisei_Decol({ weight: ["400", "500"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
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
