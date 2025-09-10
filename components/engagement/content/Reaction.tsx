"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectContent";
import { FaFire, FaHeart, FaRegHeart, FaThumbsUp } from "react-icons/fa";
import { Reactions } from "@/types/engagement";

interface ReactionButtonProps {
  reactions: Reactions; // Reactions state
  onReactionChange: (
    reactionType: keyof Reactions,
    countChange: number
  ) => void; // Function to update reactions
}

export function ReactionButton({
  reactions,
  onReactionChange,
}: ReactionButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState<
    keyof Reactions | null
  >(null);
  const handleMouseEnter = () => setOpen(true);

  const handleReactionClick = (reactionType: keyof Reactions) => {
    if (selectedReaction === reactionType) {
      // If already selected, deselect and decrease count
      setSelectedReaction(null);
      onReactionChange(reactionType, -1);
    } else {
      // If a new reaction, update the count for new reaction and reset the old one
      if (selectedReaction) {
        onReactionChange(selectedReaction, -1);
      }
      setSelectedReaction(reactionType);
      onReactionChange(reactionType, 1);
    }
  };

  return (
    <Select open={open} onOpenChange={setOpen}>
      <SelectTrigger
        className="w-[100px] border-collapse"
        onMouseEnter={handleMouseEnter}
      >
        <SelectValue
          placeholder={<FaRegHeart className="text-2xl" />}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-row">
          <SelectItem
            value={"love"}
            className="w-10"
            onClick={() => handleReactionClick("love")}
          >
            <FaHeart className="text-2xl text-pink-700" />
          </SelectItem>

          <SelectItem
            value={"fire"}
            className="w-10"
            onClick={() => handleReactionClick("fire")}
          >
            <FaFire className="text-2xl text-red-500" />
          </SelectItem>

          <SelectItem
            value={"like"}
            className="w-10"
            onClick={() => handleReactionClick("like")}
          >
            <FaThumbsUp className="text-2xl text-blue-500" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
