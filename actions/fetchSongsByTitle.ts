import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import fetchSongs from "./fetchSong";

const fetchSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabaseServer = createServerComponentClient({ cookies });

  if (!title) {
    const allSongs = await fetchSongs();
    return allSongs;
  }

  const { data, error } = await supabaseServer
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }
  console.log({ data });
  return (data as any) || [];
};

export default fetchSongsByTitle;
