import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Profile } from "../Profile";
import { Author, Content } from "@/types/engagement";
import { Badge } from "@/components/ui/badge";
import { FaHeart, FaFire, FaThumbsUp } from "react-icons/fa";

export function ContentSection({
  cover,
  title,
  tags,
  description,
  author,
  reactions,
}: Content) {
  return (
    <div className="">
      <Card className="ml-[100px] rounded-[5px] shadow-none">
        <img
          src={cover}
          className="w-full h-80 9-0 object-cover rounded-t-[5px]"
        />
        <div className="mx-20">
          <CardHeader>
            <h1 className="text-4xl font-bold py-2">{title}</h1>
            <div className="flex flex-wrap gap-2 pb-2">
              {tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-secondary text-primary text-xs rounded-[5px] font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <FaHeart className="text-2xl text-pink-700" />
                <span>{reactions?.love}</span>
              </div>
              <div className="flex gap-2">
                <FaFire className="text-2xl text-red-500" />
                <span>{reactions?.fire}</span>
              </div>
              <div className="flex gap-2">
                <FaThumbsUp className="text-2xl text-blue-500" />
                <span>{reactions?.like}</span>
              </div>
            </div>

            <div className="pt-4">
              <Profile
                imageUrl={author?.image}
                username={author?.userName}
                postDate="23 Jan 21"
              />
            </div>
          </CardHeader>
          <CardContent>{description}</CardContent>
        </div>
      </Card>
    </div>
  );
}
