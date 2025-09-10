import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import type { UserInformation } from "@/types/user";
import { staticUserProfile } from "@/lib/userProfile/information";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/userprofile/table";

export default function UserInformationCardComponent() {
  const [userInformation, setUserInformation] =
    React.useState<UserInformation | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles/ZAZA")
      .then((response) => response.json())
      .then((data) => setUserInformation(data));
  }, []);

  const user = userInformation || staticUserProfile;

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-[510px] p-6 rounded-lg bg-white">
        <div className="w-[75px] h-[55px] relative">
          <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
            អំពីអ្នក
          </CardTitle>
          <div className="w-[28px] h-[2.5px] left-[1px] top-[27px] absolute bg-[#f31260]"></div>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">នាម</TableCell>
              <TableCell className="text-right text-lg pb-[10px] font-b">
                {user.fullName || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">ឈ្មោះគណនី</TableCell>
              <TableCell className="text-right text-lg pb-[10px]">
                {user.username || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">អុីម៉ែល</TableCell>
              <TableCell className="text-right text-lg pb-[10px]">
                {user.email || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">លេខទូរស័ព្ទ</TableCell>
              <TableCell className="text-right font-roboto text-lg pb-[10px]">
                {user.phoneNumber || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">ភេទ</TableCell>
              <TableCell className="text-right font-khFont text-lg pb-[10px]">
                {user.gender || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">
                ថ្ងៃ ខែ​ ឆ្នាំកំណើត
              </TableCell>
              <TableCell className="text-right font-khFont text-lg pb-[10px]">
                {user.dob || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">ទីកន្លែងកំណើត</TableCell>
              <TableCell className="text-right font-khFont text-lg pb-[10px]">
                {user.pob || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">តួនាទី</TableCell>
              <TableCell className="text-right font-roboto text-lg pb-[10px]">
                {user.jobPosition || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg pb-[10px]">ទីកន្លែងធ្វើការ</TableCell>
              <TableCell className="text-right font-roboto text-lg pb-[10px]">
                {user.workPlace || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
