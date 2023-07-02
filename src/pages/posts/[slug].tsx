"use client";

import { getAllPosts, getSinglePost } from "@/library/notionAPI";
import { GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type PostProps = {
  //
  post: {
    metaData: { title: string; date: string; tags: string[]; description: string; slug: string };
    markdown: {
      parent: string;
    };
  };
  allPosts: any;
  params: any;
  markdown: string;
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map((value: any) => ({ params: { slug: value.slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 6,
  };
};

const Post = ({ post }: PostProps) => {
  return (
    <div className="px-3">
      <div className="relative mt-4 max-w-3xl mx-auto">
        <div
          className="absolute w-full h-full rounded-xl top-0.5 left-0.5 bg-white shadow-notepad"
          style={{ zIndex: 300 }}
        ></div>
        <div
          className="absolute w-full h-full rounded-xl top-1 left-1 bg-white shadow-notepad"
          style={{ backgroundImage: "url(/images/notepad-cover.webp)", zIndex: 200 }}
        ></div>
        <div
          className="absolute w-full h-full rounded-xl top-1.5 left-1.5 bg-white shadow-notepad"
          style={{ backgroundImage: "url(/images/notepad-cover.webp)", zIndex: 100 }}
        ></div>
        <article
          className="relative kaisei-decol flex flex-col gap-2 py-2 px-4 rounded-xl shadow-notepad origin-top-right transition"
          style={{
            zIndex: 400,
          }}
        >
          <div
            className="w-full h-8 -mt-4 bg-repeat-space bg-contain"
            style={{ backgroundImage: "url(/images/notepad-head.svg)" }}
          ></div>
          <div className="py-4 md:p-12 grid gap-3">
            <p className="text-3xl md:text-5xl text-center">{post.metaData.title}</p>
            <div
              className="w-full h-1.5 bg-repeat-space bg-contain"
              style={{ backgroundImage: "url(/images/title-border.svg)" }}
            ></div>
            <p className="text-right">{post.metaData.date}</p>
            <div className="w-full flex gap-2 flex-wrap">
              {post.metaData.tags.map((tag: string, index: number) => (
                <span key={`tag-${index}`} className="text-sm bg-[#A31C00] text-white py-1 px-5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="leading-[46px] w-full bg-repeat-y notepad-detail font-sans"
              style={{ backgroundImage: "url(/images/notepad-border.svg)" }}
            >
              <ReactMarkdown>{post.markdown.parent}</ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;
