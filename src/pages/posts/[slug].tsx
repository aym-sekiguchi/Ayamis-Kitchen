"use client";

import { getAllPosts, getSinglePost } from "@/library/notionAPI";
import { GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
    revalidate: 10,
  };
};

const Post = ({ post }: PostProps) => {
  // const [scrollY, setScrollY] = useState(0);
  // const [lastScrollY, setLastScrollY] = useState(0);
  // const handleScroll = () => {
  //   setLastScrollY(window.scrollY);
  //   let ticking = false;

  //   const updateScrollDir = () => {
  //     const scrollY = window.scrollY;
  //     if (Math.abs(scrollY - lastScrollY) < 64) {
  //       ticking = false;
  //       return;
  //     }
  //     if (scrollY > lastScrollY) {
  //       prevRef.current?.classList.add("translate-y-full");
  //     } else {
  //       prevRef.current?.classList.add("translate-y-0");
  //     }
  //     setLastScrollY(scrollY > 0 ? scrollY : 0);
  //     ticking = false;
  //   };

  //   if (!ticking) {
  //     requestAnimationFrame(updateScrollDir);
  //     ticking = true;
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // });
  return (
    <>
      {/* 一覧に戻るボタン */}
      <Link
        // ref={prevRef}
        href={"../"}
        id="prev"
        className="fixed bottom-1 right-1 rounded-xl bg-[#A31C00] py-2 px-4 text-white flex gap-2 justify-center items-center transition"
        style={{ zIndex: 500 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
        一覧に戻る
      </Link>
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
    </>
  );
};

export default Post;
