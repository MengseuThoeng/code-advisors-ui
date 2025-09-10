"use client";
import React, { useEffect } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { UserInformation } from "@/types/user";
import { mockUserInformation, simulateApiDelay } from "@/lib/mockData";

export default function Bio() {
  const [userInformation, setUserInformation] =
    React.useState<UserInformation | null>(null);

  useEffect(() => {
    // Simulate API delay with static data
    const fetchUserData = async () => {
      await simulateApiDelay(500);
      setUserInformation(mockUserInformation);
    };
    
    fetchUserData();
  }, []);

  return (
    <div>
      <Card className="w-[510px] h-[151px] p-6 rounded-lg bg-white ">
        <div className="w-[57px] h-[55px] relative">
          <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
            ប្រវត្តិរូប
          </CardTitle>
          <div className="w-[16px] h-[2.5px] left-[13px] top-[27px] absolute bg-[#f31260]"></div>
        </div>
        <CardDescription>
          <p>{userInformation ? userInformation.bio : "Loading..."}</p>
        </CardDescription>
      </Card>
    </div>
  );
}
