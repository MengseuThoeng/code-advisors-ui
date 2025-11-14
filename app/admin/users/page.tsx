'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminUsers, useBanUser, useUnbanUser } from '@/hooks/use-admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Search, ShieldBan, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_AVATAR } from '@/lib/constants';
import type { AdminUser } from '@/lib/admin-api';

export default function AdminUsersPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [actionType, setActionType] = useState<'block' | 'unblock' | null>(null);

  // Fetch users (without role/status filters since public API doesn't support them)
  const { data: usersData, isLoading, error } = useAdminUsers({
    page,
    size,
    search: search || undefined,
    sortBy: 'createdAt',
  });

  // Client-side filtering for role and status
  const filteredUsers = usersData?.content.filter((user) => {
    if (roleFilter && user.role?.toLowerCase() !== roleFilter.toLowerCase()) {
      return false;
    }
    if (statusFilter === 'verified' && !user.isVerified) {
      return false;
    }
    if (statusFilter === 'unverified' && user.isVerified) {
      return false;
    }
    return true;
  }) || [];

  // Mutations
  const banMutation = useBanUser();
  const unbanMutation = useUnbanUser();

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0); // Reset to first page on search
  };

  const handleRoleFilter = (value: string) => {
    setRoleFilter(value === 'all' ? '' : value);
    setPage(0);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value === 'all' ? '' : value);
    setPage(0);
  };

  const openBanDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setActionType('block');
  };

  const openUnbanDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setActionType('unblock');
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setActionType(null);
  };

  const handleConfirmAction = () => {
    if (!selectedUser) return;

    const userUuid = selectedUser.uuid || selectedUser.id?.toString();
    if (!userUuid) return;

    if (actionType === 'block') {
      banMutation.mutate({ userUuid, reason: 'Blocked by admin' });
    } else if (actionType === 'unblock') {
      unbanMutation.mutate(userUuid);
    }

    closeDialog();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage users, block/unblock accounts, and view user details
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by username or email..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Role Filter */}
            <Select value={roleFilter || 'all'} onValueChange={handleRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter || 'all'} onValueChange={handleStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({usersData?.totalElements || 0})</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {usersData?.totalElements || 0} users
            {(roleFilter || statusFilter) && ' (filtered)'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 font-semibold">Error loading users</p>
              <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : usersData && filteredUsers.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const userKey = user.uuid || user.id?.toString() || user.username;
                      const userAvatar = user.avatarUrl || user.profileImageUrl || DEFAULT_AVATAR;
                      const userFullName = user.firstName && user.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : null;
                      
                      return (
                      <TableRow key={userKey}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={userAvatar}
                                alt={user.username}
                              />
                              <AvatarFallback>
                                {user.username[0]?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.username}</p>
                              {userFullName && (
                                <p className="text-xs text-muted-foreground">{userFullName}</p>
                              )}
                              {user.bio && (
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {user.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{user.email || 'N/A'}</TableCell>
                        <TableCell>
                          {user.role && (
                            <Badge variant={user.role.toUpperCase() === 'ADMIN' ? 'destructive' : 'default'}>
                              {user.role.toUpperCase()}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.isVerified ? (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              Unverified
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }) : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/user/${user.username}`)}
                            >
                              View
                            </Button>
                            {user.isActive !== false ? (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openBanDialog(user)}
                                disabled={banMutation.isPending}
                              >
                                <ShieldBan className="h-4 w-4 mr-1" />
                                Ban
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => openUnbanDialog(user)}
                                disabled={unbanMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <ShieldCheck className="h-4 w-4 mr-1" />
                                Unban
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {page + 1} of {usersData.totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= usersData.totalPages - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedUser && !!actionType} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'block' ? 'Ban User' : 'Unban User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'block' ? (
                <>
                  Are you sure you want to ban <strong>{selectedUser?.username}</strong>?
                  This user will not be able to access the platform until unbanned.
                </>
              ) : (
                <>
                  Are you sure you want to unban <strong>{selectedUser?.username}</strong>?
                  This user will regain access to the platform.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={actionType === 'block' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            >
              {actionType === 'block' ? 'Ban User' : 'Unban User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
