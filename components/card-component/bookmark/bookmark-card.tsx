import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark, Eye, MessageSquare, ThumbsUp } from 'lucide-react'

interface BookmarkCardProps {
  author: {
    name: string
    avatar: string
  }
  title: string
  description: string
  tags: string[]
  metrics: {
    views: number
    likes: number
    comments: number
  }
  timeAgo: string
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export function BookmarkCard({
  author,
  title,
  description,
  tags,
  metrics,
  timeAgo,
  isBookmarked,
  onToggleBookmark
}: BookmarkCardProps) {
  return (
    <Card className="rounded-sm border-none">
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-primary">{author.name}</h3>
                <p className="text-sm text-muted-foreground">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleBookmark}
              className="text-yellow-500 hover:text-yellow-600 bg-white/80 hover:bg-white z-10"
              
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xl font-medium tracking-tight text-primary line-clamp-2">{title}</h4>
            <p className="text-slate-500 text-sm">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground ">
            <div className="flex items-center gap-1 ">
              <Eye className="h-4 w-4" />
              <span>{metrics.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{metrics.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{metrics.comments}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

