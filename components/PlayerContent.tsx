// "use client";
import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import useMusicPlayer from "@/hooks/useMusicPlayer";
import Audio from "./Audio";
interface IPlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: IPlayerContentProps) => {
  const player = useMusicPlayer();

  const playNextSong = () => {
    if (player.ids.length === 0) return;

    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const nextSong = player.ids[currentSongIndex + 1];

    if (!nextSong) return player.setId(player.ids[0]); //when the selected song is the last in the list,reset the   entire play list and start from the begining
    player.setId(nextSong);
  };
  const playPrevSong = () => {
    if (player.ids.length === 0) return;

    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const prevSong = player.ids[currentSongIndex - 1];

    if (!prevSong) return player.setId(player.ids[player.ids.length - 1]); //when the selected song is the first song and we want to select the last in the list,
    player.setId(prevSong);
  };

  return (
    <div>
      <Audio
        song={song}
        source={songUrl}
        playNextSong={playNextSong}
        playPrevSong={playPrevSong}
      />
    </div>
  );
};

export default PlayerContent;
