"use client";

import { TabsContent } from "@/components/userprofile/tabs";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmptyCard() {
  return (
    <Card className="items-center w-[680px] p-6 rounded-lg bg-white">
      <CardTitle className="font-khFont text-2xl pb-6 text-center">
        ទិន្នន័យរបស់អ្នកមិនទាន់មានទេ
      </CardTitle>
      <CardDescription>
        <p className="pb-[15px] font-khFont w-[446px] ml-[110px] text-center text-[14px] text-gray-600">
          នៅពេលដែលអ្នកធ្វើការចែករំលែក
          អ្នកបានផ្តល់ឱកាសឲ្យអ្នកដទៃបានសិក្សារៀនសូត្រ
          ហើយអ្នកខ្លួនឯងក៏ទទួលបានការពង្រឹងសមត្ថភាពបន្ថែមដូចគ្នា។
        </p>
        <p className="font-khFont w-[446px] ml-[112px] text-center text-[16px] text-primary">
          សូមចុចលើប៊ូតុង បង្កើតថ្មី​ ដើម្បីចែករំលែកមាតិការបស់អ្នក
        </p>
      </CardDescription>
      <Button className="font-khFont ml-[300px] text-center mt-4 text-gray-100">
        បង្កើតថ្មី
      </Button>
    </Card>
  );
}
