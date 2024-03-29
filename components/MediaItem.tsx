"use client";

import useLoadImage from "@/hooks/useLoadImage";
import useMusicPlayer from "@/hooks/useMusicPlayer";
import { Song } from "@/types";
import Image from "next/image";

interface IMediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ song, onClick }: IMediaItemProps) => {
  const imageUrl = useLoadImage(song);
  const player = useMusicPlayer();
  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
    return player.setId(song.id);
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imageUrl || "/images/like.png"}
          alt={`image-${song.title}`}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 truncate">{song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
