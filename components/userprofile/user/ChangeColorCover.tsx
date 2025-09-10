import React, { useState } from "react";
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/userprofile/form";
import { CardTitle } from "@/components/ui/card";
import { ColorPicker } from "@/components/userprofile/user/colorPicker";

interface ChangeColorCoverProps {
  onColorChange?: (color: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChangeColorCover({
  onColorChange,
  onChange,
}: ChangeColorCoverProps) {
  const [bgColor, setBgColor] = useState<string>("#000040");

  const handleColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    setBgColor(formattedColor);
    if (onColorChange) {
      onColorChange(formattedColor);
    }
  };

  return (
    <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border">
      {/* <CardTitle className="font-khFont w-[450px] text-2xl pb-6 text-start">
        ផ្ទាំងខាងក្រោយ
      </CardTitle> */}
      <div className="w-28 h-[50px] relative mr-[340px]">
        <div className="w-[61px] h-[2.5px] left-[16.5px] top-[27px] absolute bg-[#f31260]"></div>
        <CardTitle className="absolute text-primary w-[450px] text-2xl">
          ផ្ទាំងខាងក្រោយ
        </CardTitle>
      </div>
      <FormControl>
        <ColorPicker initialColor={bgColor} onColorChange={handleColorChange} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
