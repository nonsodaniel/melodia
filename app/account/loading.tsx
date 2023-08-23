import Box from "@/components/Box";
import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="flex items-center justify-center h-full">
      <BounceLoader color="yellow" size={43} />
    </Box>
  );
};

export default Loading;
