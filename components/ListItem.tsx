"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaPlay } from "react-icons/fa";
interface IListemProps {
  name: string;
  image: string;
  href: string;
}

const ListItem = ({ name, image, href }: IListemProps) => {
  const router = useRouter();
  const onClick = () => router.push(href);
  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" alt="image" src={image} fill />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-yellow-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay />
      </div>
    </button>
  );
};

export default ListItem;
