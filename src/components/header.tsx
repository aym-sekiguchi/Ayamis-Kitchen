import Link from "next/link";

type HeaerProps = {
  //
};

const Header = (props: HeaerProps) => {
  const {} = props;
  return (
    <header>
      <div className="h-32 w-full bg-repeat-x" style={{ backgroundImage: "url(/images/head.webp)" }}></div>
      <h1 className="text-3xl kaisei-decol mt-4 mb-8 max-w-5xl mx-auto">
        <Link href="/" className="pl-3">
          Ayami&apos;s Kitchen
        </Link>
      </h1>
    </header>
  );
};

export default Header;
