import Link from "next/link";

type notepadProps = {
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
};

const Notepad = (props: notepadProps) => {
  const { title, date, tags, description, slug } = props;
  return (
    <div className="relative mt-4">
      <div
        className="absolute w-full h-full rounded-xl top-0.5 left-0.5 bg-white shadow-notepad"
        style={{ zIndex: 300 }}
      ></div>
      <div
        className="absolute w-full h-full rounded-xl top-1 left-1 bg-white shadow-notepad"
        style={{ zIndex: 200 }}
      ></div>
      <div
        className="absolute w-full h-full rounded-xl top-1.5 left-1.5 bg-white shadow-notepad"
        style={{ backgroundImage: "url(/images/notepad-cover.webp)", zIndex: 100 }}
      ></div>
      <Link
        href={`posts/${slug}`}
        className="h-full relative kaisei-decol flex flex-col gap-2 py-2 px-4 rounded-xl items-center shadow-notepad origin-top-right notepad-hover transition duration-500"
        style={{
          backgroundImage: "url(/images/notepad-cover.webp)",
          zIndex: 400,
        }}
      >
        <div
          className="w-full h-8 -mt-4 bg-repeat-space bg-contain"
          style={{ backgroundImage: "url(/images/notepad-head.svg)" }}
        ></div>
        <p className="text-2xl md:text-3xl">{title}</p>
        <div className="border-t border-current w-full"></div>
        <p className="w-full">{date}</p>
        <div className="w-full flex gap-1 flex-wrap">
          {tags.map((value: any, index: number) => (
            <span key={`tags${index}`} className="text-sm bg-[#A31C00] text-white py-1 px-5 rounded-full">
              {value}
            </span>
          ))}
        </div>
        <p className="w-full">{description}</p>
      </Link>
    </div>
  );
};

export default Notepad;
