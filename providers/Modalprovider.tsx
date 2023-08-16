"use client";
import AuthModal from "@/components/AuthModal";
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
    </div>
  );
};

export default Modalprovider;
