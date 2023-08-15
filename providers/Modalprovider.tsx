"use client";
import Modal from "@/components/Modal";
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
      <Modal
        title="Some title"
        description="some description"
        onChange={() => null}
        isOpen
      >
        {" "}
        Some Modal{" "}
      </Modal>
    </div>
  );
};

export default Modalprovider;
