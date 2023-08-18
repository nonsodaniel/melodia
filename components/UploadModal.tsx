"use client";
import React, { Fragment, useEffect, useState } from "react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const uploadModal = useUploadModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      title="Upload modal title"
      description="Upload modal description"
      onChange={handleChange}
      isOpen={uploadModal.isOpen}
    >
      Upload modal
    </Modal>
  );
};

export default UploadModal;
