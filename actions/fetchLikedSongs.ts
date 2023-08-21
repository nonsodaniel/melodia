import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const fetchLikedSongs = async (): Promise<Song[]> => {
  const supabaseServer = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } =
    await supabaseServer.auth.getSession();
  if (sessionError) {
    return [];
  }

  const { data, error } = await supabaseServer
    .from("liked_song")
    .select("*, songs(*)")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs }));
};

export default fetchLikedSongs;
