"use client";

import React from "react";
import Image from "next/image";
import type { UserInformation } from "@/types/user";
import { ChangeEvent, useState, ReactNode } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface ProfileImageProps {
  disableButton?: ReactNode;
}

export default function ProfileImagey({ disableButton }: ProfileImageProps) {
  const [userInformation, setUserInformation] =
      React.useState<UserInformation | null>(null);

  React.useEffect(() => {
      fetch("http://localhost:8080/api/v1/edit_user_profiles/ZAZA")
        .then((response) => response.json())
        .then((data) => setUserInformation(data));
    }, []);
  
    const user = userInformation;
  
  // State to manage the profile image
  const [image, setImage] = useState<string>(
    "/user-profile-image/lyzhia-profile.jpg"
  );
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      {/* Profile image section */}
      <div className="flex flex-row absolute -bottom-28 left-8">
        <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-white bg-white">
          <Image src={image} alt="Profile" fill className="object-cover" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="avatarInput"
          />
        </div>
        {disableButton ?? (
          <button
            type="button"
            className="absolute bottom-3 left-36 cursor-pointer h-8 w-8 flex items-center justify-center bg-gray-200 text-white rounded-full hover:bg-primary transition-colors duration-300"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            <FontAwesomeIcon className="text-gray-400" icon={faCamera} />
          </button>
        )}
        {/* Profile details section */}
        <div className="flex items-center justify-between absolute -right-60 top-28">
          <div>
            <div className="flex gap-3">
              <h2 className="text-3xl font-bold">{user?.fullName}</h2>
              <HoverCard>
                <HoverCardTrigger className="flex cursor-pointer items-center text-3xl">
                  ✨
                </HoverCardTrigger>
                <HoverCardContent className="text-sm text-gray-200">
                  ITE-Student
                </HoverCardContent>
              </HoverCard>
            </div>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
            <p className="text-sm text-muted-foreground font-khFont pt-1">
              គាត់គឺជា Senior
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
