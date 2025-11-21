'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { 
  useAdminVerify, 
  useOverviewStats, 
  useUserStats, 
  useContentStats 
} from '@/hooks/use-admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Tag, 
  TrendingUp, 
  Calendar,
  Activity,
  BarChart3,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2 text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{trend.value > 0 ? '+' : ''}{trend.value} {trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StatCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Check admin status
  const { data: adminVerify, isLoading: verifyLoading, error: verifyError } = useAdminVerify();
  
  // Fetch stats
  const { data: overviewStats, isLoading: overviewLoading, refetch: refetchOverview } = useOverviewStats();
  const { data: userStats, isLoading: userStatsLoading, refetch: refetchUserStats } = useUserStats(period);
  const { data: contentStats, isLoading: contentStatsLoading, refetch: refetchContentStats } = useContentStats();

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (!verifyLoading && adminVerify && !adminVerify.isAdmin) {
      router.push('/home');
    }
  }, [authLoading, user, verifyLoading, adminVerify, router]);

  // Handle refresh all
  const handleRefreshAll = () => {
    refetchOverview();
    refetchUserStats();
    refetchContentStats();
  };

  // Show loading state while checking authentication
  if (authLoading || verifyLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    );
  }

  // Don't render if not admin (will redirect) - but only if we have a definitive answer
  if (adminVerify && !adminVerify.isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of platform statistics and activity
          </p>
        </div>
        <Button 
          onClick={handleRefreshAll} 
          variant="outline"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Quick Navigation */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/admin/users')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">User Management</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage users, block/unblock accounts
            </p>
            <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700">
              View Users <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Hidden - Coming Soon Features */}
        {/* <Card className="cursor-pointer hover:shadow-lg transition-shadow opacity-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Content Moderation</CardTitle>
            <FileText className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review and moderate articles
            </p>
            <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-gray-400" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow opacity-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Comment Moderation</CardTitle>
            <MessageSquare className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review and moderate comments
            </p>
            <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-gray-400" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card> */
      </div>

      {/* Today's Activity Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Today&apos;s Activity
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {overviewLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="New Users Today"
                value={overviewStats?.todayRegistrations || 0}
                description="Registered today"
                icon={<Users className="h-4 w-4 text-blue-600" />}
              />
              <StatCard
                title="Articles Published Today"
                value={overviewStats?.todayArticles || 0}
                description="Published today"
                icon={<FileText className="h-4 w-4 text-green-600" />}
              />
              <StatCard
                title="Active Users Today"
                value={overviewStats?.activeUsers || 0}
                description="Currently active"
                icon={<Activity className="h-4 w-4 text-purple-600" />}
              />
            </>
          )}
        </div>
      </div>

      {/* Platform Overview Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Platform Overview
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overviewLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Users"
                value={overviewStats?.totalUsers || 0}
                description="Registered users"
                icon={<Users className="h-4 w-4 text-blue-600" />}
                trend={{
                  value: overviewStats?.todayRegistrations || 0,
                  label: 'today'
                }}
              />
              <StatCard
                title="Total Articles"
                value={overviewStats?.totalArticles || 0}
                description="Published articles"
                icon={<FileText className="h-4 w-4 text-green-600" />}
                trend={{
                  value: overviewStats?.todayArticles || 0,
                  label: 'today'
                }}
              />
              <StatCard
                title="Total Comments"
                value={overviewStats?.totalComments || 0}
                description="User comments"
                icon={<MessageSquare className="h-4 w-4 text-purple-600" />}
              />
              <StatCard
                title="Total Tags"
                value={overviewStats?.totalTags || 0}
                description="Content tags"
                icon={<Tag className="h-4 w-4 text-orange-600" />}
              />
            </>
          )}
        </div>
      </div>

      {/* User Growth Chart Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            User Growth
          </h2>
          <div className="flex gap-2">
            <Button
              variant={period === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('7d')}
            >
              7 Days
            </Button>
            <Button
              variant={period === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('30d')}
            >
              30 Days
            </Button>
            <Button
              variant={period === '90d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('90d')}
            >
              90 Days
            </Button>
            <Button
              variant={period === '1y' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('1y')}
            >
              1 Year
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          {userStatsLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats?.totalUsers.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userStats?.newUsers || 0} new in this period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats?.verifiedUsers.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userStats?.unverifiedUsers || 0} unverified
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats?.usersByRole.admin || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Administrators
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats?.usersByRole.user || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Standard users
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Registration Trend</CardTitle>
            <CardDescription>Daily new user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            {userStatsLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : userStats && userStats.growthData && userStats.growthData.length > 0 ? (
              <div className="h-64 flex items-end justify-between gap-1">
                {userStats.growthData.map((data, index) => {
                  const maxCount = Math.max(...userStats.growthData.map(d => d.count));
                  const height = maxCount > 0 ? (data.count / maxCount) * 100 : 0;
                  
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-full flex flex-col items-center">
                        <div className="text-xs font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {data.count}
                        </div>
                        <div
                          className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                          style={{ height: `${height}%`, minHeight: data.count > 0 ? '4px' : '0px' }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 truncate w-full text-center">
                        {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No growth data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Content Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Content Distribution
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {contentStatsLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contentStats?.articles.published.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {contentStats?.articles.todayPublished || 0} published today
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Draft Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contentStats?.articles.draft.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unpublished drafts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contentStats?.comments.total.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {contentStats?.comments.todayComments || 0} comments today
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Top Tags */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Tag className="h-5 w-5 mr-2" />
          Top Tags
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Most Used Tags</CardTitle>
            <CardDescription>Popular content categories</CardDescription>
          </CardHeader>
          <CardContent>
            {contentStatsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : contentStats && contentStats.tags.mostUsed && contentStats.tags.mostUsed.length > 0 ? (
              <div className="space-y-3">
                {contentStats.tags.mostUsed.map((tag, index) => {
                  const maxCount = contentStats.tags.mostUsed[0]?.count || 1;
                  const percentage = (tag.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{tag.name}</span>
                        <span className="text-muted-foreground">{tag.count} articles</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No tag data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
