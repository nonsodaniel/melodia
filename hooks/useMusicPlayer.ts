import { MusicPlayer } from "@/types";
import { create } from "zustand";

const useMusicPlayer = create<MusicPlayer>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (id: string[]) => set({ ids: id }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default useMusicPlayer;
