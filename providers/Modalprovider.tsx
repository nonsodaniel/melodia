"use client";
import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";
import React, { useEffect, useState } from "react";
interface IModalproviderProps {
  products: ProductWithPrice[];
}

const Modalprovider = ({ products }: IModalproviderProps) => {
  const [isClientSideRendered, setIsClientSideRendered] = useState(false);
  useEffect(() => {
    setIsClientSideRendered(true);
  }, []);
  if (!isClientSideRendered) {
    //when server side is rendered
    return null;
  }

  return (
    <div>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </div>
  );
};

export default Modalprovider;
