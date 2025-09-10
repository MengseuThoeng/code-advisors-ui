import React, { useEffect, useState } from "react";
import AwardCard from "./AwardCard";
import { useParams } from "next/navigation";

// Type for Achievement data
type Achievement = {
  id: string;
  userId: number;
  score: number;
  level: string;
};

export default function ParentComponent() {
  const { id } = useParams<{ id: string }>(); // Get the dynamic route ID
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const response = await fetch(
          `https://675fdc231f7ad2426999a73c.mockapi.io/achievement/${id}`
        );

        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data: Achievement = await response.json();
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return achievement ? <AwardCard achievement={achievement} /> : <div>No Achievement Found</div>;
}
