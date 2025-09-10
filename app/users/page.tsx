"use client";
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Users, 
  Star, 
  MapPin, 
  TrendingUp,
  UserPlus,
  UserCheck,
  ChevronDown,
  Award,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function UsersDirectory() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("followers");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [followingStatus, setFollowingStatus] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Mock fetch users data - replace with real API
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUsers = [
          {
            id: "1",
            name: "Sarah Chen",
            username: "sarahdev",
            displayUsername: "@sarahdev",
            bio: "Senior Frontend Developer passionate about React and TypeScript. Building beautiful user experiences.",
            location: "New York, NY",
            followers: 2847,
            following: 567,
            posts: 89,
            level: "Senior Developer",
            score: 4250,
            coverColor: "#2563eb",
            isVerified: true,
            skills: ["React", "TypeScript", "Next.js"],
            joinedDate: "2022-01-15"
          },
          {
            id: "2", 
            name: "Mike Johnson",
            username: "mikejs",
            displayUsername: "@mikejs",
            bio: "Full-stack developer specializing in Node.js and microservices. Love mentoring developers.",
            location: "San Francisco, CA",
            followers: 1234,
            following: 892,
            posts: 156,
            level: "Expert Developer", 
            score: 3100,
            coverColor: "#059669",
            isVerified: false,
            skills: ["Node.js", "MongoDB", "Docker"],
            joinedDate: "2021-03-20"
          },
          {
            id: "3",
            name: "Emily Rodriguez",
            username: "emilycode",
            displayUsername: "@emilycode",
            bio: "Data Scientist and ML Engineer. Turning data into insights and building intelligent systems.",
            location: "Austin, TX",
            followers: 1876,
            following: 432,
            posts: 67,
            level: "Data Expert",
            score: 3650,
            coverColor: "#7c3aed",
            isVerified: true,
            skills: ["Python", "TensorFlow", "SQL"],
            joinedDate: "2021-08-10"
          },
          {
            id: "4",
            name: "Alex Kim",
            username: "alexdev",
            displayUsername: "@alexdev",
            bio: "Mobile app developer creating cross-platform apps with React Native and Flutter.",
            location: "Seattle, WA",
            followers: 934,
            following: 267,
            posts: 43,
            level: "Mobile Expert",
            score: 2100,
            coverColor: "#dc2626",
            isVerified: false,
            skills: ["React Native", "Flutter", "Swift"],
            joinedDate: "2022-05-03"
          },
          {
            id: "5",
            name: "Jessica Wu",
            username: "jessicawu",
            displayUsername: "@jessicawu",
            bio: "DevOps Engineer passionate about automation, cloud infrastructure, and CI/CD pipelines.",
            location: "Denver, CO",
            followers: 1523,
            following: 345,
            posts: 78,
            level: "DevOps Expert",
            score: 2890,
            coverColor: "#ea580c",
            isVerified: true,
            skills: ["AWS", "Docker", "Kubernetes"],
            joinedDate: "2020-11-22"
          },
          {
            id: "6",
            name: "David Park",
            username: "davidp",
            displayUsername: "@davidp",
            bio: "Backend developer focused on scalable APIs and database optimization. Performance enthusiast.",
            location: "Chicago, IL",
            followers: 756,
            following: 189,
            posts: 32,
            level: "Backend Developer",
            score: 1750,
            coverColor: "#0891b2",
            isVerified: false,
            skills: ["Java", "Spring", "PostgreSQL"],
            joinedDate: "2023-02-14"
          }
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        
        // Mock following status
        const status: {[key: string]: boolean} = {};
        mockUsers.forEach(user => {
          status[user.id] = Math.random() > 0.7;
        });
        setFollowingStatus(status);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Level filter
    if (filterBy !== "all") {
      filtered = filtered.filter(user => {
        switch (filterBy) {
          case "verified":
            return user.isVerified;
          case "senior":
            return user.level.includes("Senior") || user.level.includes("Expert");
          case "new":
            return new Date(user.joinedDate) > new Date("2023-01-01");
          default:
            return true;
        }
      });
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "followers":
          return b.followers - a.followers;
        case "posts":
          return b.posts - a.posts;
        case "score":
          return b.score - a.score;
        case "newest":
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, sortBy, filterBy]);

  const handleFollow = (userId: string) => {
    setFollowingStatus(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const UserCard = ({ user }: { user: any }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white overflow-hidden">
      {/* Cover Header */}
      <div 
        className="h-24 bg-gradient-to-r relative"
        style={{ 
          background: `linear-gradient(135deg, ${user.coverColor}, ${user.coverColor}AA)`
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        {user.isVerified && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/20 border-white/30 text-white backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 -mt-8 relative">
        <div className="flex items-start justify-between mb-4">
          {/* Avatar */}
          <div className="relative z-10">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src="/user.jpg" alt={user.name} />
              <AvatarFallback 
                className="text-lg font-bold text-white text-shadow"
                style={{ backgroundColor: user.coverColor }}
              >
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Follow Button */}
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              handleFollow(user.id);
            }}
            className={`transition-all duration-200 ${
              followingStatus[user.id] 
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300" 
                : "bg-gradient-to-r from-[#000040] to-[#CD3937] hover:from-[#000040]/90 hover:to-[#CD3937]/90 text-white shadow-lg"
            }`}
          >
            {followingStatus[user.id] ? (
              <>
                <UserCheck className="w-4 h-4 mr-1" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-1" />
                Follow
              </>
            )}
          </Button>
        </div>

        {/* User Info */}
        <Link href={`/user/${user.username}`} className="block">
          <div className="space-y-3">
            {/* Name and Username */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#CD3937] transition-colors">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{user.displayUsername}</p>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {user.bio}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {user.skills.slice(0, 3).map((skill: string) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-xs bg-gray-100 text-gray-700 hover:bg-[#000040] hover:text-white transition-colors"
                >
                  {skill}
                </Badge>
              ))}
              {user.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-[#CD3937]/10 text-[#CD3937]">
                  +{user.skills.length - 3} more
                </Badge>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
              <div className="text-center">
                <div className="font-bold text-sm text-gray-900">{user.followers}</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-sm text-gray-900">{user.posts}</div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-sm text-gray-900">{user.score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>

            {/* Location and Level */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{user.location}</span>
              </div>
              <Badge className="bg-gradient-to-r from-[#000040] to-[#CD3937] text-white text-xs">
                <Award className="w-3 h-3 mr-1" />
                {user.level}
              </Badge>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-[320px] px-8 py-4 pt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Developers</h1>
            <p className="text-gray-600">Connect with talented developers from around the world</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search developers by name, skills, or location..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Filters */}
                <div className="flex gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[120px]">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterBy("all")}>
                        All Developers
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterBy("verified")}>
                        Verified Only
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterBy("senior")}>
                        Senior/Expert
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterBy("new")}>
                        New Members
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[120px]">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Sort By
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("followers")}>
                        Most Followers
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("posts")}>
                        Most Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("score")}>
                        Highest Score
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("newest")}>
                        Recently Joined
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                <div className="text-sm text-gray-600">Total Developers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold text-gray-900">{users.filter(u => u.isVerified).length}</div>
                <div className="text-sm text-gray-600">Verified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-gray-900">{users.filter(u => u.level.includes("Expert") || u.level.includes("Senior")).length}</div>
                <div className="text-sm text-gray-600">Expert Level</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-gray-900">{users.filter(u => new Date(u.joinedDate) > new Date("2023-01-01")).length}</div>
                <div className="text-sm text-gray-600">New This Year</div>
              </CardContent>
            </Card>
          </div>

          {/* Users Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-300 rounded w-16"></div>
                          <div className="h-6 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredUsers.length} of {users.length} developers
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No developers found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
