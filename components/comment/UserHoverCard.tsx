'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { User, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DEFAULT_AVATAR } from '@/lib/constants';

interface UserHoverCardProps {
  username: string;
  children: React.ReactNode;
}

interface UserProfile {
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  createdAt: string;
}

export function UserHoverCard({ username, children }: UserHoverCardProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://159.65.8.211:8080/api/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          // API returns user object directly, not wrapped in payload
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CD3937]"></div>
          </div>
        ) : user ? (
          <div className="space-y-4">
            {/* Header with Avatar and Name */}
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatarUrl || DEFAULT_AVATAR} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-[#000040] to-[#CD3937] text-white text-xl">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-sm text-gray-500 truncate">@{user.username}</p>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-sm text-gray-700 line-clamp-3">
                {user.bio}
              </p>
            )}

            {/* Additional Info */}
            <div className="space-y-2 text-sm text-gray-600">
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            {/* View Profile Button */}
            <Button 
              className="w-full bg-gradient-to-r from-[#000040] to-[#CD3937] hover:from-[#000040]/90 hover:to-[#CD3937]/90 text-white"
              onClick={() => router.push(`/user/${user.username}`)}
            >
              <User className="w-4 h-4 mr-2" />
              View Profile
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <User className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <div className="text-sm">User not found</div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
