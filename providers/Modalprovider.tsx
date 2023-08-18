"use client";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import React, { useEffect, useState } from "react";

const Modalprovider = () => {
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
    </div>
  );
};

export default Modalprovider;
