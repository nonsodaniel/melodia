"use client";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useFetchBySongId = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  //  something to note is that supabaseClient from useSessionContext is used to get/display details for only authenticated user
  //  using import { useSupabaseClient } from "@supabase/auth-helpers-react";
  //   using  const supabaseClient = useSupabaseClient(); can display for both auth/non-auth users

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data);
      setIsLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useFetchBySongId;
