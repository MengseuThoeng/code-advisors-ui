"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserActivity from "@/components/userprofile/user/achievement/userActivivity";
import AwardCard from "./AwardCard";

// Updated Achievement type to ensure userId is a number
type Achievement = {
  id: string;
  userId: number; // 🔥 Updated from string to number
  score: number;
  level: string;
};

export default function AchievementLevel() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const response = await fetch(
          "https://675fdc231f7ad2426999a73c.mockapi.io/achievement/1"
        );
        
        if (!response.ok) throw new Error("Failed to fetch achievement data");

        const data: Achievement = await response.json();
        
        if (data && typeof data.userId === "string") {
          // 🔥 Convert userId to number if it's a string
          data.userId = parseInt(data.userId, 10);
        }

        setAchievement(data);
      } catch (err: unknown) {
        console.error("Error fetching achievement data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full h-fit bg-white">
      <CardHeader>
        <div className="w-[73px] h-[40px] relative">
          <div className="left-0 top-0 absolute text-center text-2xl font-bold">
            សមិទ្ធផល
          </div>
          <div className="w-[32px] h-[2.5px] left-[2.50px] top-[27px] absolute bg-[#f31260]"></div>
        </div>
        <p className="font-khFont text-muted-foreground">
          មានរឿងជាច្រើនដែលយើងទទួលបានពីសមិទ្ធផល
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center">
          {achievement ? (
            <AwardCard achievement={achievement} />
          ) : (
            <div>No Achievement Found</div>
          )}
        </div>

        <div className="mt-6">
          <UserActivity />
        </div>
      </CardContent>
    </Card>
  );
}
