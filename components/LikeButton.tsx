"use client";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface ILikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: ILikeButtonProps) => {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();
  const { supabaseClient } = useSessionContext();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_song")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (data && !error) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_song")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_song").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Success");
      }
    }

    router.refresh();
  };

  return (
    <button className="transition hover:opacity-75" onClick={handleLike}>
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
