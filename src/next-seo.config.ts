import { DefaultSeoProps } from "next-seo";

const url = "https://ayamis-kitchen.aymportfolio.com/";
const name = "Ayami's Kitchen";
const description = "Ayamiのレシピを見ておいしいご飯やパン・お菓子を作りましょう!";

const config: DefaultSeoProps = {
  defaultTitle: `${name} `,
  titleTemplate: `%s | ${name} `,
  description: description,
  // canonical: url,
  themeColor: "#a31c00",

  // openGraph
  openGraph: {
    type: "website",
    url: url,
    title: name,
    siteName: `${name} `,
    description: description,
    locale: "ja_JP",
    // images: [{ url: `${url}ogp/index.jpg`, width: 1200, height: 600, alt: name }],
  },

  // twitter
  twitter: {
    cardType: "",
    // site: '',
    // handle: '',
  },

  // add meta
  additionalMetaTags: [],

  // add link
  additionalLinkTags: [],
};

export default config;
