import Link from "next/link";

type FooterProps = {
  //
};

const Header = (props: FooterProps) => {
  const {} = props;
  return (
    <footer className="mt-20 border-t border-t-black mb-10">
      <p className="text-xs text-center p-3">&copy;2023 saym</p>
    </footer>
  );
};

export default Header;
