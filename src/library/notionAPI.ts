import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { useRef, RefObject, createRef } from "react";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// 記事のすべてのメタデータを取得
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    // filter: {
    //   property: "title",
    //   formula: {
    //     string: {
    //       equals: title,
    //     },
    //   },
    // },
    page_size: 100,
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    // return post;
    return getPageMetaData(post);
  });
};

// postの独自型宣言（不使用）
type Post = {
  id: string;
  properties: {
    Name: {
      title: { plain_text: string }[];
    };
    Description: {
      rich_text: { plain_text: string }[];
    };
    Date: {
      date: {
        start: string;
      };
    };
    Slug: {
      rich_text: { plain_text: string }[];
    };
    Tags: {
      multi_select: string[];
    };
  };
};

// 記事のメタデータを取得
const getPageMetaData = (post: any) => {
  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    //*********properties.Slug.rich_text[0].plain_text
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: post.properties.Tags.multi_select.map((tag: any) => tag.name),
  };
};

// slugの記事のメタデータを取得
export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metaData = getPageMetaData(page);

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  // console.log(mdString);

  return { metaData, markdown: mdString };
};

// 存在するタグの配列を取得して配列に格納
export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  let allTags: string[] = [];
  allPosts.map((post) => allTags.push(...post.tags));
  const allTagList = Array.from(new Set(allTags));
  console.log(allTagList);
  return allTagList;
};

export const getPostByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) => post.tags.find((tag: string) => tag === tagName));
  return posts;
};
