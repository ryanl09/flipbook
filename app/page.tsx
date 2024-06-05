import Image from "next/image";
import Link from "next/link";
import { AiFillPrinter } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { RiBook2Fill } from "react-icons/ri";
import Logo from "@/components/Logo";

export default function Home(): JSX.Element {
  return (
    <main className="">
      <nav className="p-4 flex items-center">
        <Logo />
        <div className="ml-auto">
          <Link href='/create'>
            <button className="bg-primary text-background px-3 py-1 rounded-lg font-semibold
              flex items-center gap-2 text-sm transition-colors hover:bg-primary-h">
              <IoAddCircle />
              Create
            </button>
          </Link>
        </div>
      </nav>

      <div className="px-96">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="card shadow-sm transition-all hover:shadow-md">
              <IoMdCamera className="text-secondary text-xl" />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="card shadow-sm transition-all hover:shadow-md">
              <FaImage className="text-secondary text-xl" />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="card shadow-sm transition-all hover:shadow-md">
              <AiFillPrinter className="text-secondary text-xl" />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="card shadow-sm transition-all hover:shadow-md">
              <RiBook2Fill className="text-secondary text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div>test</div>
    </main>
  );
}
