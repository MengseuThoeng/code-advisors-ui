"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  MapPin, 
  Calendar, 
  Mail, 
  Link as LinkIcon,
  Trophy,
  BookOpen,
  Heart,
  Users,
  Star,
  Award,
  TrendingUp,
  UserPlus,
  UserCheck,
  Flag
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function UserProfile() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  
  const [userData, setUserData] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetch user data by username - replace with real API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock different user data based on username
        const mockUsers = {
          "sarahdev": {
            id: "1",
            name: "Sarah Chen",
            username: "@sarahdev",
            bio: "Senior Frontend Developer at TechCorp. Passionate about React, TypeScript, and creating beautiful user experiences. Always learning and sharing knowledge with the community.",
            location: "New York, NY",
            joined: "January 2022",
            email: "sarah.chen@techcorp.com",
            website: "sarahchen.dev",
            followers: 2847,
            following: 567,
            posts: 89,
            level: "Senior Developer",
            score: 4250,
            progress: 85,
            coverColor: "#2563eb",
            isVerified: true,
            achievements: [
              { id: 1, title: "React Expert", icon: "⚛️", earned: true },
              { id: 2, title: "Community Leader", icon: "👑", earned: true },
              { id: 3, title: "Open Source Hero", icon: "🌟", earned: true },
              { id: 4, title: "Bug Hunter", icon: "🐛", earned: true },
            ]
          },
          "mikejs": {
            id: "2",
            name: "Mike Johnson",
            username: "@mikejs",
            bio: "Full-stack developer specializing in Node.js and microservices. Love building scalable backend systems and mentoring junior developers.",
            location: "San Francisco, CA",
            joined: "March 2021",
            email: "mike.johnson@example.com",
            website: "mikejs.dev",
            followers: 1234,
            following: 892,
            posts: 156,
            level: "Expert Developer",
            score: 3100,
            progress: 70,
            coverColor: "#059669",
            isVerified: false,
            achievements: [
              { id: 1, title: "Node.js Master", icon: "🟢", earned: true },
              { id: 2, title: "API Architect", icon: "🏗️", earned: true },
              { id: 3, title: "Mentor", icon: "🎓", earned: false },
              { id: 4, title: "Code Reviewer", icon: "👀", earned: true },
            ]
          },
          "emilycode": {
            id: "3",
            name: "Emily Rodriguez",
            username: "@emilycode",
            bio: "Data Scientist and ML Engineer. Turning data into insights and building intelligent systems.",
            location: "Austin, TX",
            joined: "August 2021",
            email: "emily.rodriguez@example.com",
            website: "emilyrodriguez.dev",
            followers: 1876,
            following: 432,
            posts: 67,
            level: "Data Expert",
            score: 3650,
            progress: 80,
            coverColor: "#7c3aed",
            isVerified: true,
            achievements: [
              { id: 1, title: "Python Expert", icon: "🐍", earned: true },
              { id: 2, title: "ML Pioneer", icon: "🤖", earned: true },
              { id: 3, title: "Data Wizard", icon: "📊", earned: true },
              { id: 4, title: "Research Leader", icon: "🔬", earned: false },
            ]
          }
        };

        // Remove @ symbol if present and convert to lowercase
        const cleanUsername = username.replace('@', '').toLowerCase();
        const user = mockUsers[cleanUsername as keyof typeof mockUsers] || {
          id: "unknown",
          name: "User Not Found",
          username: `@${cleanUsername}`,
          bio: "This user profile is not available.",
          location: "Unknown",
          joined: "Recently",
          email: "",
          website: "",
          followers: 0,
          following: 0,
          posts: 0,
          level: "New User",
          score: 0,
          progress: 0,
          coverColor: "#6b7280",
          isVerified: false,
          achievements: []
        };

        setUserData(user);
        // Mock following status
        setIsFollowing(Math.random() > 0.5);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Here you would make an API call to follow/unfollow
  };

  const handleMessage = () => {
    // Navigate to message/chat with this user using username
    router.push(`/messages/${username}`);
  };

  if (isLoading) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-[320px] px-8 py-4 pt-16 flex justify-center">
          <div className="max-w-7xl w-full">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div className="h-48 bg-gray-300 rounded-lg"></div>
                  <div className="h-32 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="lg:col-span-2">
                  <div className="h-96 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-[320px] px-8 py-4 pt-16 flex justify-center">
          <div className="max-w-7xl w-full text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
            <p className="text-gray-600 mb-8">The user profile you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </main>
    );
  }

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
                background: `linear-gradient(135deg, ${userData.coverColor} 0%, ${userData.coverColor}CC 50%, ${userData.coverColor}99 100%)` 
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
                  <Flag className="w-4 h-4" />
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
                    {userData.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {userData.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
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
                  <Button 
                    onClick={handleFollow}
                    className={isFollowing 
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                      : "bg-primary hover:bg-primary/90 text-white"
                    }
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleMessage}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                    {userData.isVerified && (
                      <Badge className="bg-blue-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
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
                  {userData.website && (
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-primary hover:underline cursor-pointer">{userData.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Developer Level Card */}
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
                      Level {Math.floor(userData.progress / 20) + 1} Developer
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
                    {userData.achievements.map((achievement: any) => (
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
                    <span className="font-semibold">{Math.floor(userData.posts * 0.3)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="font-semibold">{Math.floor(userData.posts * 2.1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Likes Received</span>
                    </div>
                    <span className="font-semibold">{Math.floor(userData.followers * 0.4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Helped Users</span>
                    </div>
                    <span className="font-semibold">{Math.floor(userData.score / 50)}</span>
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
                    <span>{userData.name}'s Posts & Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Recent Posts will be loaded here */}
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>{userData.name}'s posts and activities will appear here</p>
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
