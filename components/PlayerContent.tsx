// "use client";
import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import useMusicPlayer from "@/hooks/useMusicPlayer";
import useSound from "use-sound";

interface IPlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: IPlayerContentProps) => {
  const [volume, setVolume] = useState(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const player = useMusicPlayer();

  const Icon = isMusicPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

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

  const handlePlay = () => {
    if (!isMusicPlaying) {
      play();
    } else {
      pause();
    }
  };

  const handleToggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsMusicPlaying(true),
    onend: () => {
      playNextSong();
      setIsMusicPlaying(false);
    },
    onpause: () => setIsMusicPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex md:hidden col-auto justify-end items-center w-full">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={playPrevSong}
        />
        <div
          className="h-10 w-10 flex items-center rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={playNextSong}
        />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={playPrevSong}
        />
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={playNextSong}
        />
      </div>

      <div className="hidden mdd:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            className="cursor-pointer"
            size={34}
            onClick={handleToggleMute}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
