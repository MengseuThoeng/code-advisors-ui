"use client";
import EditUserInformationForm from "@/components/userprofile/user/EditUserInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import ProfileImage from "@/components/userprofile/user/ProfileImage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditUser() {
  const methods = useForm();
  const [bgColor, setBgColor] = useState<string>("#000040");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles/ZAZA")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.coverColor) {
          setBgColor(data.coverColor);
          methods.setValue("bgColor", data.coverColor);
        }
      })
      .catch((error) => console.error("Error fetching cover color:", error))
      .finally(() => setLoading(false));
  }, []);

  // Update background color when the user selects a new color
  const handleColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    setBgColor(formattedColor);
    methods.setValue("bgColor", formattedColor); // Save color in form state
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex justify-centermin-h-screen justify-center dark:bg-gray-900  p-4">
        <div className="w-[1252px] bg-white pb-4 rounded-lg">
          <div className="flex justify-center mb-8">
            <div
              className="cover w-[1252px] h-[200px] rounded-[5px] flex justify-center relative"
              style={{ backgroundColor: bgColor }}
            >
              <ProfileImage />
            </div>
          </div>
          <div className="flex flex-row space-x-5 justify-center">
            <div className="flex flex-row justify-center mt-[125px] gap-[15px]">
              <EditUserInformationForm
                onColorChange={handleColorChange}
                bgColor={bgColor}
              />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
