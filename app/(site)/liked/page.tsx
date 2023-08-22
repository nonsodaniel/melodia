export const revalidate = 0;
import fetchLikedSongs from "@/actions/fetchLikedSongs";
import Header from "@/components/Header";
import LikedDetails from "@/components/LikedDetails";
import Image from "next/image";
import React from "react";

const Liked = async () => {
  const likedSongs = await fetchLikedSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32  lg:h-44 lg:w-44">
              <Image
                src={"/images/like.png"}
                alt="Playlist"
                className="object-cover"
                fill
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm"></p>
              <h1 className="text-white text-4l sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedDetails songs={likedSongs} />
    </div>
  );
};

export default Liked;
