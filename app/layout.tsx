import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import Modalprovider from "@/providers/Modalprovider";
import ToastProvider from "@/providers/ToastProvider";
import fetchSongsByUserId from "@/actions/fetchSongsByUserId";
import MusicPlayer from "@/components/MusicPlayer";
import fetchActiveProductsWithPrices from "@/actions/fetchActiveProductsWithPrices";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melodia",
  description: "Discover life through Music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await fetchSongsByUserId();
  const products = await fetchActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <Modalprovider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <MusicPlayer />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
