import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface ProfileProps {
  imageUrl?: string;
  username?: string;
  postDate?: string;
}

export function Profile({ imageUrl, username, postDate }: ProfileProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage className="w-8 h-8 rounded-[100%]" src={imageUrl} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">{username}</h2>
          <p className="text-xs text-muted-foreground">{postDate}</p>
        </div>
      </div>
    </div>
  );
}
