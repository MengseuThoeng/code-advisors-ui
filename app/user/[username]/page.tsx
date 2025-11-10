"use client";
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
  Flag,
  Settings,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useUserByUsername, useUserStats, useToggleFollow } from "@/hooks/use-user";
import { useArticles } from "@/hooks/use-article";
import { useAuth } from "@/hooks/use-auth";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { UserArticleList } from "@/components/card-component/card/UserArticleList";

export default function UserProfile() {
  const params = useParams();
  const router = useRouter();
  const username = (params.username as string)?.replace('@', '');
  
  // Fetch user data using TanStack Query
  const { data: userData, isLoading, error } = useUserByUsername(username);
  const { data: userStats } = useUserStats(userData?.uuid || '');
  const { data: userArticles, isLoading: articlesLoading } = useArticles({ 
    author: username,
    page: 0,
    limit: 10,
    sortBy: 'latest'
  });
  const { user: currentUser } = useAuth();
  const toggleFollowMutation = useToggleFollow();

  const isOwnProfile = currentUser?.username === username;
  // Get isFollowing status from userData (backend returns this when authenticated)
  const isFollowing = userData?.isFollowing === true;

  const handleFollow = () => {
    if (userData?.uuid) {
      toggleFollowMutation.mutate(userData.uuid);
    }
  };

  const handleMessage = () => {
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
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-16"></div>

              {/* Profile Actions */}
              <div className="absolute top-6 right-6 flex space-x-3 z-10">
                {isOwnProfile && (
                  <Badge className="bg-white/20 text-white border-white/20 backdrop-blur-sm mr-2">
                    Your Profile
                  </Badge>
                )}
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                {!isOwnProfile && (
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm">
                    <Flag className="w-4 h-4" />
                  </Button>
                )}
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
                  <AvatarImage 
                    src={userData.avatarUrl || DEFAULT_AVATAR} 
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-white">
                    {userData.firstName?.[0]}{userData.lastName?.[0]}
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
                    <div className="text-2xl font-bold text-gray-900">{userStats?.postsCount || userData.postsCount}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userStats?.followersCount || userData.followersCount}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userStats?.followingCount || userData.followingCount}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="flex space-x-3">
                  {isOwnProfile ? (
                    // Own profile - show Edit Profile button
                    <Button 
                      onClick={() => router.push('/edituser')}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    // Other user's profile - show Follow and Message buttons
                    <>
                      <Button 
                        onClick={handleFollow}
                        disabled={toggleFollowMutation.isPending}
                        className={isFollowing 
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                          : "bg-primary hover:bg-primary/90 text-white"
                        }
                      >
                        {toggleFollowMutation.isPending ? (
                          <>Processing...</>
                        ) : isFollowing ? (
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
                    </>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {userData.firstName} {userData.lastName}
                    </h1>
                    {userData.isVerified && (
                      <Badge className="bg-blue-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-gray-600">@{userData.username}</p>
                </div>
                
                <p className="text-gray-700 max-w-2xl leading-relaxed">{userData.bio || 'No bio provided'}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {userData.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  {userData.websiteUrl && (
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={userData.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer">
                        {userData.websiteUrl.replace(/^https?:\/\//, '')}
                      </a>
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
                    <span>Reputation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {userData.role === 'ROLE_ADMIN' ? 'Admin' : 'Developer'}
                      </Badge>
                      <span className="text-sm font-medium">{userData.reputation} XP</span>
                    </div>
                    <Progress value={Math.min((userData.reputation / 1000) * 100, 100)} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">
                      Level {Math.floor(userData.reputation / 100) + 1} Developer
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
                    {/* Placeholder achievements - replace with real data when backend supports it */}
                    <div className="p-3 rounded-lg border text-center bg-gray-50 border-gray-200">
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="text-xs font-medium text-gray-700">Coming Soon</div>
                    </div>
                    <div className="p-3 rounded-lg border text-center bg-gray-50 border-gray-200">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-xs font-medium text-gray-700">Coming Soon</div>
                    </div>
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
                    <span className="font-semibold">{userStats?.postsCount || userData.postsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Forum Posts</span>
                    </div>
                    <span className="font-semibold">{userStats?.forumPostsCount || userData.forumPostsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Reputation</span>
                    </div>
                    <span className="font-semibold">{userStats?.reputation || userData.reputation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Followers</span>
                    </div>
                    <span className="font-semibold">{userStats?.followersCount || userData.followersCount}</span>
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
                    <span>{userData.firstName}'s Posts & Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {articlesLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : userArticles?.content && userArticles.content.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-600">
                          {userArticles.totalElements} {userArticles.totalElements === 1 ? 'article' : 'articles'} published
                        </p>
                      </div>
                      <UserArticleList articles={userArticles.content} />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium text-gray-700">No articles yet</p>
                      <p className="text-sm mt-1">
                        {isOwnProfile 
                          ? "Start writing your first article!" 
                          : `${userData.firstName} hasn't published any articles yet.`
                        }
                      </p>
                      {isOwnProfile && (
                        <Button 
                          onClick={() => router.push('/content/new')}
                          className="mt-4"
                        >
                          Create Article
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
