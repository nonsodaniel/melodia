"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import PlayButton from "./PlayButton";
interface ISongItemProps {
  data: Song;
  handleClick: (id: string) => void;
}

const SongItem = ({ data, handleClick }: ISongItemProps) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      className="flex flex-col items-center justify-center rounded-md  overflow-hidden 
      gap-x-4 bg-neutral-400/5  cursor-pointer hover:bg-neutral-400/10 transition p-3 relative group"
      onClick={() => handleClick(data.id)}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="onject-cover"
          src={imagePath || "/images/like.png"}
          alt={`image-${data.title}`}
          fill
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-sm w-full truncate pb-3 text-neutral-400">
          By {data.author}
        </p>
        <div className="absolute bottom-24 right-5">
          <PlayButton />
        </div>
      </div>
    </div>
  );
};

export default SongItem;
