"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SearchFilter() {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 rounded px-3 py-1 text-sm"
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
