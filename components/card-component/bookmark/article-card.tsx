import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from 'lucide-react'
import Image from "next/image"

interface ArticleCardProps {
  title: string
  description: string
  tags: string[]
  thumbnail: string
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export function ArticleCard({
  title,
  description,
  tags,
  thumbnail,
  isBookmarked,
  onToggleBookmark
}: ArticleCardProps) {
  return (
    <Card className="h-full relative rounded-sm border-gray-100 ">
      <CardContent className="p-4 pb-12 space-y-4">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight text-primary line-clamp-2">{title}</h3>
          <p className="text-slate-500 text-sm line-clamp-2">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-secondary text-primary text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-10 right-2 text-yellow-500 hover:text-yellow-600 bg-white/80 hover:bg-white z-10"
          onClick={onToggleBookmark}
        >
          <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
      </CardContent>
    </Card>
  )
}

