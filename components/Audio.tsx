import React, { useState, useRef, MouseEvent } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Song } from "@/types";
import LikeButton from "./LikeButton";

interface AudioProps {
  source: string;
  playNextSong: () => void;
  playPrevSong: () => void;
  song: Song;
}

export default function Audio({
  source,
  playNextSong,
  playPrevSong,
  song,
}: AudioProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useRef<HTMLAudioElement | null>(null);

  const onPlay = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const aud = audio.current;

    if (aud) {
      if (isPlaying) {
        aud.pause();
      } else {
        aud.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AudioPlayer
      className="bg-black text-center"
      preload="metadata"
      autoPlay
      src={source}
      volume={0.5}
      onPlay={(e: any) => onPlay(e)}
      onEnded={() => playNextSong()}
      onPlayError={() => console.log("An error occurred")}
      header={
        <div className="text-center flex justify-between flex-center ">
          <p>
            <span className="text-white truncate">{song.title} </span>
            <span className="text-neutral-400 truncate">by {song.author}</span>
          </p>

          <span>
            <LikeButton songId={song.id} iconSize="18" />
          </span>
        </div>
      }
      onClickNext={playNextSong}
      onClickPrevious={playPrevSong}
      showSkipControls={true}
      showJumpControls={false}
    />
  );
}
