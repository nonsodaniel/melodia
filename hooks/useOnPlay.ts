import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import useMusicPlayer from "./useMusicPlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = useMusicPlayer();
  const authModal = useAuthModal();
  const { user } = useUser();
  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();
    player.setId(id); //current song the user clicked on
    const prevSongs = songs.map((song) => song.id);
    player.setIds(prevSongs); //previously clicked songs
  };
  return onPlay;
};

export default useOnPlay;
