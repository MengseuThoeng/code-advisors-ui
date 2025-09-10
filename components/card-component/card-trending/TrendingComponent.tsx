import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationProps {
  type: "Latest" | "Trending";
  items: string[];
}

export default function Recommendations({ type, items }: RecommendationProps) {
  return (
    <Card className="w-[341px] h-[315px] rounded-[5px] ">
      <div className="my-1">
      <CardHeader>
        <CardTitle className="flex font-normal items-center gap-2 text-2xl text-primary">
          <Star className="h-6 w-6 fill-red-500 text-red-500" />
          {type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="text-primary">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      </div>
    </Card>
  );
}
