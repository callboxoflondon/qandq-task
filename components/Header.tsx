import Image from "next/image";
import Link from "next/link";
import { MdOutlineExplore } from "react-icons/md";
import appLogo from "../public/app-logo.svg";
import mobileLogo from "../public/logo-mobile.svg";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  return (
    <header className="bg-black  fixed w-full bg-opacity-90 z-50">
      <div className="py-4 px-2 md:py-5 md:px-16 max-w-[1920px]  items-center text-secondary flex justify-between">
        <nav className="flex space-x-2 md:space-x-5 items-center">
          <Link className="hidden md:block" href="/">
            <Image
              className="w-44 object-contain cursor-pointer"
              src={appLogo}
              alt="app-logo"
            />
          </Link>
          <Link className="md:hidden" href="/">
            <Image
              className="w-8 object-contain cursor-pointer"
              src={mobileLogo}
              alt="app-logo"
            />
          </Link>
          <ul className="text-sm flex space-x-2 md:space-x-5 md:text-xl  items-center">
            <li>
              <Link href="/explore">
                <h3 className=" hidden md:block py-1 px-4 hover:border-white active:scale-[0.98] hover:text-white border border-secondary rounded-full">
                  Explore
                </h3>
                <MdOutlineExplore className="md:hidden text-4xl active:text-white active:scale-[0.98]" />
              </Link>
            </li>
            <li>
              <HeaderSearch />
            </li>
          </ul>
        </nav>
        <button className="text-sm py-1 px-2 md:px-4 md:text-xl active:border-white active:text-white md:hover:border-white active:scale-[0.98] md:hover:text-white border border-secondary rounded-full">
          Logout
        </button>
      </div>
    </header>
  );
}
