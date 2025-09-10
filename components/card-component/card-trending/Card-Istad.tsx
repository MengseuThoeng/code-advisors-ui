import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, MapPin, Phone } from "lucide-react";

export default function ISTADCard() {
  const programs = [
    { title: "Fundamental Programming", color: "bg-blue-100" },
    { title: "Mobile Development", color: "bg-blue-100" },
    { title: "Front-End Development", color: "bg-blue-100" },
    { title: "Database Management", color: "bg-blue-100" },
    { title: "Back-End Development", color: "bg-blue-100" },
    { title: "DevOps Engineering", color: "bg-blue-100" },
    { title: "Data Analytics", color: "bg-blue-100" },
    { title: "Blockchain Development", color: "bg-blue-100" },
  ];

  const navigateToISTAD = () => {
    window.open("https://www.cstad.edu.kh/", "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      onClick={navigateToISTAD}
      className="w-[341px] h-[315px] mx-auto overflow-hidden rounded-[5px] hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="my-4">
        <CardHeader className="py-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold text-[#1a237e]">ISTAD</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
          <div className="bg-[#1a237e] p-3 rounded-lg space-y-2">
            <div className="grid grid-cols-4 gap-1">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="p-1 text-center bg-white/10 rounded text-white text-[10px] hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {program.title}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-white text-xs">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>(855) 093 990 910</span>
              </div>
              <div className="flex items-center gap-1">
                <span>fb.com/istad.co</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-normal text-[#1a237e] leading-tight">
              Join our intensive Bachelor of Information and Technology and
              launch your dev career
            </h2>
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-600">01/01/2025</div>
              <a
                href="https://maps.app.goo.gl/ASr8ExGKiBFFzEKj7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Phnom Penh</span>
              </a>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
