import Layout from "@/components/layouts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kaisei_Decol } from "next/font/google";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config";
import Script from "next/script";
import * as gtag from "@/library/gtag";
import { useRouter } from "next/router";

const kaiseiDecol = Kaisei_Decol({ weight: ["400", "500"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
      <style jsx global>{`
        .kaisei-decol {
          font-family: ${kaiseiDecol.style.fontFamily};
        }
      `}</style>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
