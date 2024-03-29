"use client";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useMusicPlayer from "@/hooks/useMusicPlayer";

interface IHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: IHeaderProps) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const player = useMusicPlayer();
  const { user } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("User Logged out successfully!");
    }
  };
  console.log({ user });
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-yellow-800 p-6`,
        className
      )}
    >
      <span className="md:hidden block text-center pt-2 pb-5">
        Welcome, <span className="text-yellow-500">{user?.email}</span>
      </span>
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
          {user ? (
            <Fragment>
              <div className="flex gap-x-2 items-center">
                <span className="md:block hidden">
                  Welcome,{" "}
                  <span className="text-yellow-500">{user?.email}</span>
                </span>
                <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                  Logout
                </Button>

                <Button
                  className="bg-white w-10"
                  onClick={() => router.push("/account")}
                >
                  <FaUserAlt />
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="">
                <Button
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={authModal.onOpen}
                >
                  Sign Up
                </Button>
              </div>
              <div className="">
                <Button
                  className="bg-white px-6 py-2"
                  onClick={authModal.onOpen}
                >
                  Login
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
