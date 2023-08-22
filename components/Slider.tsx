"use client";
import React from "react";
import * as VolumeSlider from "@radix-ui/react-slider";
interface ISliderProps {
  value?: number;
  onChange: (value: number) => void;
}

const Slider = ({ value = 1, onChange }: ISliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };
  return (
    <VolumeSlider.Root
      className="flex items-center select-none touch-none w-full h-10 relative"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <VolumeSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <VolumeSlider.Range className="h-full rounded-full absolute bg-white"></VolumeSlider.Range>
      </VolumeSlider.Track>
    </VolumeSlider.Root>
  );
};

export default Slider;
