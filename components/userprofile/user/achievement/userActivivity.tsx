import React, { useEffect, useState } from "react";
import {
  DataBlockBlue,
  DataBlockGreen,
  DataBlockPink,
  DataBlockPurple,
  DataBlockYellow,
} from "@/components/userprofile/user/achievement/UserDatapoint";
import { arabicToKhmer } from "@/lib/userProfile/information";

export default function UserActivityPoints() {
  const [activityData, setActivityData] = useState({
    like: 0,
    question: 0,
    answer: 0,
    comment: 0,
    content: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await fetch(
          "https://6759303460576a194d137ab3.mockapi.io/api/v1/activity-data/activity-data/3"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActivityData(data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const dataBlocks = [
    {
      component: DataBlockPink,
      number: activityData.like,
      text: "ធ្លាប់ចូលចិត្ត",
      color: "bg-pink-500",
    },
    {
      component: DataBlockBlue,
      number: activityData.question,
      text: "ធ្លាប់បានសួរ",
      color: "bg-blue-500",
    },
    {
      component: DataBlockGreen,
      number: activityData.answer,
      text: "ធ្លាប់បានឆ្លើយ",
      color: "bg-green-600",
    },
    {
      component: DataBlockYellow,
      number: activityData.comment,
      text: "ធ្លាប់ផ្តល់មតិ",
      color: "bg-orange-400",
    },
    {
      component: DataBlockPurple,
      number: activityData.content,
      text: "បង្កើតមាតិកា",
      color: "",
    },
  ];

  return (
    <div className="w-full max-w-3xl space-y-4 justify-center items-center flex flex-col">
      <div className="flex items-center w-[400px] justify-center">
        {dataBlocks.map(
          ({ component: Component, number, text, color }, index) => (
            <React.Fragment key={index}>
              <Component number={arabicToKhmer(number)} text={text} />
              {color && (
                <div className="flex w-full items-center">
                  <div className={`h-1 w-full ${color} rounded-sm`}></div>
                </div>
              )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}
