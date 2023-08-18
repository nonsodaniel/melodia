import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const fetchSongs = async (): Promise<Song[]> => {
  console.log("got here");
  const supabaseServer = createServerComponentClient({ cookies });
  const { data, error } = await supabaseServer
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default fetchSongs;
