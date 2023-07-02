import { getAllPosts, getAllTags } from "../library/notionAPI";
import Notepad from "@/components/notepad";
import React, { RefObject, createRef, useRef, useState } from "react";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();
  return {
    props: {
      allPosts,
      allTags,
    },
    revalidate: 60 * 60 * 6,
  };
};

type Props = {
  allPosts: any;
  allTags: string[];
};

export default function Home(props: Props) {
  const { allPosts, allTags } = props;
  const tag: boolean[] = [];
  const [tagActive, setTagActive] = useState(tag);
  const [search, setSearch] = useState(allPosts);
  const tagRefs = useRef<RefObject<HTMLButtonElement>[]>([]);
  allTags.forEach((_, index) => {
    tag.push(true);
    tagRefs.current[index] = createRef<HTMLButtonElement>();
  });
  console.log(tagActive);

  // タグで表示するpostを絞り込む
  const searchByTags = () => {
    const activeIndexOfActiveTag: number[] = [];
    tagActive.map((element: boolean, index: number) => {
      if (element === true) {
        activeIndexOfActiveTag.push(index);
      }
    });
    const activePostsByTag: any[] = [];
    activeIndexOfActiveTag.map((indexOfActiveTag: number) =>
      activePostsByTag.push(
        allPosts.filter((post: any) => post.tags.find((tag: string) => tag === allTags[indexOfActiveTag]))
      )
    );
    const activePosts = Array.from(new Set(activePostsByTag.flat()));
    setSearch(activePosts);
  };

  // すべて選択
  const handleClickAllTags = () => {
    tagActive.map((active) => (active = true));
    allTags.forEach((_, index) => {
      tagActive[index] = true;
      tagRefs.current[index].current?.classList.add("bg-[#A31C00]");
      tagRefs.current[index].current?.classList.remove("bg-[#ccc]");
    });
    searchByTags();
  };

  // タグをクリック
  const handleClickTag = (index: number) => {
    tagRefs.current[index].current?.classList.toggle("bg-[#A31C00]");
    tagRefs.current[index].current?.classList.toggle("bg-[#ccc]");
    tagActive[index] = !tagActive[index];
    searchByTags();
  };

  return (
    <div className="max-w-5xl px-3 mx-auto">
      <div>
        <h2 className="kaisei-decol text-center">
          Welcome to<span className="hidden md:inline">&ensp;</span>
          <br className="md:hidden" />
          Ayami&apos;s Kitchen!
        </h2>

        {/* tag area */}
        <section className="kaisei-decol my-8">
          <p className="flex gap-1 text-xl items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
                clipRule="evenodd"
              />
            </svg>
            タグで絞り込む
          </p>
          <div className="bg-white p-4 rounded-xl border-dashed border-current border-2 grid gap-4">
            <button
              onClick={handleClickAllTags}
              className="cursor-pointer items-center flex gap-1 bg-[#441800] text-white py-1 px-4 w-fit rounded-xl transition hover:opacity-70"
            >
              すべて選択する
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
            <div className="flex gap-4 flex-wrap">
              {allTags.map((tag: string, index: number) => (
                <button
                  onClick={() => handleClickTag(index)}
                  ref={tagRefs.current[index]}
                  key={`tags${index}`}
                  className="md:text-xl bg-[#A31C00] transition text-white py-1 px-5 rounded-full cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* post area */}
        <section className="grid md:grid-cols-2 gap-10">
          {search.map((value: any, index: number) => (
            <Notepad
              key={`notepad${index}`}
              title={value.title}
              date={value.date}
              tags={value.tags}
              description={value.description}
              slug={value.slug}
            />
          ))}
        </section>
      </div>
      <div className="grid md:grid-cols-2 gap-10"></div>
    </div>
  );
}
