"use client";
import useFetchBySongId from "@/hooks/useFetchSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useMusicPlayer from "@/hooks/useMusicPlayer";
import React from "react";
import PlayerContent from "./PlayerContent";

const MusicPlayer = () => {
  const player = useMusicPlayer();
  const { song } = useFetchBySongId(player.activeId!);
  const songUrl = useLoadSongUrl(song!); // song! is used because 'song' can never be null or undefined This is known as the "non-null assertion operator."
  console.log({ song, songUrl, player });
  if (!song || !songUrl || !player.activeId) return null;
  console.log({ songUrl, song });

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default MusicPlayer;
