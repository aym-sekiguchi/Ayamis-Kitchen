import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body
        className="bg-repeat-y bg-left-top text-[#441800]"
        style={{ backgroundImage: "url(/images/background.webp)" }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
