import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SearchTag } from "@/lib/reading"
import Footer from "@/components/footer/Footer"

interface SearchTagsProps {
  tags: SearchTag[]
  selectedTags: string[]
  onTagClick: (tagId: string) => void
}

export function SearchTags({ tags, selectedTags, onTagClick }: SearchTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 ">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick(tag.id)}
          className="focus:outline-none"
        >
          <Badge
            variant="outline"
            className={cn(
              "border-secondary text-primary text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white",
              selectedTags.includes(tag.id) && "hover:bg-primary hover:text-white"
            )}
          >
            {tag.label}
          </Badge>
        </button>
      ))}
    </div>
    
    
  )
}

