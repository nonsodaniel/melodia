"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface ISearchContentProps {
  songs: Song[];
}
const SearchContent = ({ songs }: ISearchContentProps) => {
  console.log({ songs });
  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 wi-full px-6 text-neutral-400">
        No Songs found
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem key={song.id} song={song} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
