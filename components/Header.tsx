"use client";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";

interface IHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: IHeaderProps) => {
  const router = useRouter();
  const handleLogout = () => {};
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-yellow-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full bg-white p-2 flex flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full bg-white p-2 flex flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Fragment>
            <div className="">
              <Button
                className="bg-transparent text-neutral-300 font-medium"
                onClick={() => null}
              >
                Sign Up
              </Button>
            </div>
            <div className="">
              <Button className="bg-white px-6 py-2" onClick={() => null}>
                Login
              </Button>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default Header;
