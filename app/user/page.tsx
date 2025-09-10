"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Edit, 
  Settings, 
  Share2, 
  MoreHorizontal, 
  MapPin, 
  Calendar, 
  Mail, 
  Link as LinkIcon,
  Trophy,
  BookOpen,
  MessageSquare,
  Heart,
  Users,
  Star,
  Award,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function User() {
  const [bgColor, setBgColor] = useState("#000040");
  const router = useRouter();

  const handleEdit = () => {
    router.push("/edituser");
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles/ZAZA")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.coverColor) {
          setBgColor(data.coverColor);
        }
      })
      .catch((error) => console.log("Error fetching cover color:", error));
  }, []);

  // Mock user data - replace with real API calls
  const userData = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Full-stack developer passionate about creating innovative solutions. Love working with React, Node.js, and exploring new technologies.",
    location: "San Francisco, CA",
    joined: "March 2023",
    email: "john.doe@example.com",
    website: "johndoe.dev",
    followers: 1247,
    following: 892,
    posts: 156,
    level: "Expert Developer",
    score: 2850,
    progress: 75,
    achievements: [
      { id: 1, title: "Code Master", icon: "🏆", earned: true },
      { id: 2, title: "Community Helper", icon: "🤝", earned: true },
      { id: 3, title: "Tutorial Creator", icon: "📚", earned: false },
      { id: 4, title: "Bug Hunter", icon: "🐛", earned: true },
    ]
  };

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-[320px] px-8 py-4 pt-16 flex justify-center">
        <div className="max-w-7xl w-full">
          {/* Modern Cover Section */}
          <Card className="overflow-hidden mb-6 border-0 shadow-lg">
            {/* Cover Image */}
            <div
              className="relative h-64 bg-gradient-to-br from-primary via-primary/90 to-primary/70"
              style={{ 
                background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}CC 50%, ${bgColor}99 100%)` 
              }}
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-16"></div>

              {/* Profile Actions */}
              <div className="absolute top-6 right-6 flex space-x-3 z-10">
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Profile Info Section */}
            <CardContent className="relative px-8 pb-8 pt-0">
              {/* Profile Image - Overlapping cover */}
              <div className="absolute -top-16 left-8 z-20">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage src="/user.jpg" alt={userData.name} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Stats Row - Repositioned */}
              <div className="flex justify-between items-start pt-6">
                <div className="flex space-x-8 ml-40"> {/* Offset for profile image */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userData.posts}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userData.followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userData.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="flex space-x-3">
                  <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90">
                    <Edit className="w-4 h-4 mr-2 text-white"  />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-8 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                  <p className="text-lg text-gray-600">{userData.username}</p>
                </div>
                
                <p className="text-gray-700 max-w-2xl leading-relaxed">{userData.bio}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userData.joined}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-primary hover:underline cursor-pointer">{userData.website}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Achievement Level Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>Developer Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {userData.level}
                      </Badge>
                      <span className="text-sm font-medium">{userData.score} XP</span>
                    </div>
                    <Progress value={userData.progress} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">
                      {Math.round((100 - userData.progress) * 50)} XP to next level
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          achievement.earned
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <div className="text-2xl mb-1">{achievement.icon}</div>
                        <div className="text-xs font-medium text-gray-700">
                          {achievement.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>Activity Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Articles Written</span>
                    </div>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="font-semibold">167</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Likes Received</span>
                    </div>
                    <span className="font-semibold">892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Helped Users</span>
                    </div>
                    <span className="font-semibold">45</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - User Posts */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>Recent Posts & Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Recent Posts will be loaded here */}
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>User posts and activities will appear here</p>
                      <p className="text-sm">Connect with the API to load real content</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
