"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Users as UsersIcon, UserPlus, Loader2, Award, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUsers, useToggleFollow } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { DEFAULT_AVATAR } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<'reputation' | 'followers' | 'posts'>('reputation');
  
  const { data, isLoading, error } = useUsers({
    page,
    limit: 12,
    search,
    sortBy,
  });

  const toggleFollowMutation = useToggleFollow();

  const handleFollow = (userUuid: string) => {
    toggleFollowMutation.mutate(userUuid);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
              <UsersIcon className="w-7 h-7 md:w-8 md:h-8 mr-3 text-primary" />
              Community Members
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Discover and connect with developers in the CodeAdvisors community
            </p>
          </div>

          <Card className="mb-6 border border-gray-200/60 shadow-sm">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <Input
                    placeholder="Search users by name or username..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-9 md:pl-10 h-10 md:h-11"
                  />
                </div>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-full md:w-[180px] h-10 md:h-11">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reputation">Reputation</SelectItem>
                    <SelectItem value="followers">Followers</SelectItem>
                    <SelectItem value="posts">Posts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <Card className="p-8 text-center border border-red-200 bg-red-50">
              <p className="text-red-600">Failed to load users. Please try again.</p>
            </Card>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                {data.content.map((user) => (
                  <Card
                    key={user.username}
                    className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5 border border-gray-200/60 shadow-sm overflow-hidden"
                  >
                    <div className="p-5 md:p-6">
                      <div 
                        onClick={() => router.push(`/user/${user.username}`)}
                        className="flex items-start gap-4 mb-4 cursor-pointer"
                      >
                        <div className="relative flex-shrink-0">
                          <Avatar className="w-14 h-14 md:w-16 md:h-16 ring-2 ring-gray-100 group-hover:ring-primary/20 transition-all">
                            <AvatarImage
                              src={user.avatarUrl || DEFAULT_AVATAR}
                              alt={user.username}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-lg">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          {user.isVerified && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-white text-[10px]">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-primary transition-colors truncate">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 truncate">@{user.username}</p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-xs font-semibold text-amber-600">{user.reputation}</span>
                            <span className="text-xs text-gray-500">rep</span>
                          </div>
                        </div>
                      </div>
                      {user.bio && (
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                          {user.bio}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users2 className="w-3.5 h-3.5" />
                          <span className="text-xs md:text-sm font-medium">{user.followersCount}</span>
                          <span className="text-xs text-gray-500">followers</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span className="text-xs md:text-sm font-medium">{user.followingCount}</span>
                          <span className="text-xs text-gray-500">following</span>
                        </div>
                      </div>
                      {currentUser?.username !== user.username ? (
                        <Button
                          onClick={() => handleFollow(user.username)}
                          size="sm"
                          className="w-full h-9 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white"
                          disabled={toggleFollowMutation.isPending}
                        >
                          {toggleFollowMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                              Follow
                            </>
                          )}
                        </Button>
                      ) : (
                        <Badge variant="secondary" className="w-full justify-center py-2 text-xs font-medium">
                          This is you
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              {data.totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 md:gap-4 mt-8 pb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="h-9"
                  >
                    Previous
                  </Button>
                  <span className="text-xs md:text-sm text-gray-600 font-medium">
                    Page {page + 1} of {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(data.totalPages - 1, p + 1))}
                    disabled={page === data.totalPages - 1}
                    className="h-9"
                  >
                    Next
                  </Button>
                </div>
              )}
              {data.content.length === 0 && (
                <Card className="p-12 text-center border border-gray-200/60">
                  <UsersIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No users found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
