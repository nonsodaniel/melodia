import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import useMusicPlayer from "./useMusicPlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
  const player = useMusicPlayer();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
