"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface IPageContentProps {
  songs: Song[];
}

const PageContents = ({ songs }: IPageContentProps) => {
  const onPlay = useOnPlay(songs);
  if (!!songs?.length) {
    <div className="mt-4 text-neutral-400">PageContents</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          data={song}
          handleClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  );
};

export default PageContents;
