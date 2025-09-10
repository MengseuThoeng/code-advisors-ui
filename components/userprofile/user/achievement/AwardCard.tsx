import { Card } from "@/components/ui/card";
import { ArrowUp, BadgeCheck } from "lucide-react";

type Achievement = {
  id: string;
  userId: string | number;
  score: number;
  level: string;
};

type AwardCardProps = {
  achievement: Achievement;
};

function convertToKhmerNumerals(number: number): string {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return number.toString().split('').map(digit => khmerDigits[parseInt(digit)]).join('');
}

function determineLevel(score: number): { level: string; image: string } {
  if (score >= 0 && score <= 99) return { level: "Learner", image: "/user-profile-image/badge.png" };
  if (score >= 100 && score <= 499) return { level: "Contributor", image: "/images/contributor.png" };
  if (score >= 500 && score <= 999) return { level: "Senior", image: "/images/senior.png" };
  if (score >= 1000 && score <= 1999) return { level: "Expert", image: "/images/expert.png" };
  if (score >= 2000 && score <= 3499) return { level: "Mentor", image: "/images/mentor.png" };
  if (score >= 3500 && score <= 4999) return { level: "Top Contributor", image: "/images/top-contributor.png" };
  if (score >= 5000) return { level: "Verified Expert", image: "/images/verified-expert.png" };
  return { level: "Unknown", image: "/images/default.png" }; // Default case
}

export default function AwardCard({ achievement }: AwardCardProps) {
  const { level, image } = determineLevel(achievement.score);

  return (
    <Card className="p-6 flex items-center justify-between w-[450px]">
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold">{convertToKhmerNumerals(achievement.score)}</span>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-red-500 text-base font-bold">ពិន្ទុសរុប</span>
            <ArrowUp className="h-12 w-9 text-green-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BadgeCheck className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="h-[100px] w-[100px]"
          src={image}
          alt={`${level} achievement badge`}
        />
        {/* <span className="text-navy font-semibold">{level}</span> */}
        <p className="text-lg font-semibold">{level}</p>
      </div>
    </Card>
  );
}