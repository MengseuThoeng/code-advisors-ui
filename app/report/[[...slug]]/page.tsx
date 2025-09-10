"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ReportReason } from "@/types/engagement";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ReportAbusePage() {

  const [reason, setReason] = useState<ReportReason>("spam");
  const [details, setDetails] = useState("");
  const router = useRouter();
  const params = useParams(); // Get the dynamic params
  
  // Extract the values from params
  const type = params.slug ? params.slug[0] : ''; // 'content' or 'comment'
  const contentId = params.slug ? params.slug[1] : ''; // Content ID
  const commentId = params.slug ? params.slug[2] : ''; // Comment ID, if available

  console.log('Type:', type); // 'content' or 'comment'
  console.log('Content ID:', contentId);
  console.log('Comment ID:', commentId);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/content/${contentId}`);  // Go to content page
  };

  console.log({ type, contentId, commentId });

  return (
    <div className="container mx-auto p-4 mt-[20px]">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            Report {type === "comment" ? "Comment" : type === "content" ? "Content" : "What What What"}
            </CardTitle>
        </CardHeader>
        <form onSubmit={handleReportSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Reason for reporting</Label>
              <RadioGroup
                value={reason}
                // onValueChange={setReason}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spam" id="spam" />
                  <Label htmlFor="spam" className="text-sm">Spam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="harassment" id="harassment" />
                  <Label htmlFor="harassment" className="text-sm">Harassment or hate speech</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate" className="text-sm">Inappropriate content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="text-sm">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details" className="text-lg font-semibold">Additional details</Label>
              <Textarea
                id="details"
                placeholder="Please provide any additional information about this report"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleReportSubmit} className="w-full sm:w-auto text-white">
              Send Report
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}