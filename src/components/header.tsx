import Link from "next/link";

type HeaerProps = {
  //
};

const Header = (props: HeaerProps) => {
  const {} = props;
  return (
    <header>
      <div
        className="h-24 bg-bottom md:h-32 w-full bg-repeat-x"
        style={{ backgroundImage: "url(/images/head.webp)" }}
      ></div>
      <h1 className="text-2xl md:text-3xl kaisei-decol mt-2 md:mt-4 mb-4 md:mb-8 max-w-5xl mx-auto">
        <Link href="/" className="pl-3">
          Ayami&apos;s Kitchen
        </Link>
      </h1>
    </header>
  );
};

export default Header;
