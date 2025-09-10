import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bookmark, Share2, Trash2, MoreVertical } from 'lucide-react'

interface HistoryActionsProps {
  onBookmark?: () => void
  onRemove?: () => void
  onShare?: () => void
}

export function HistoryActions({ onBookmark, onRemove, onShare }: HistoryActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={onBookmark}>
          <Bookmark className="mr-2 h-4 w-4" />
          <span>Bookmark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemove}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Remove</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

