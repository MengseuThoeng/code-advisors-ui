'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, User, LogOut, Settings, Bell, PenSquare } from "lucide-react";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { DEFAULT_AVATAR } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarComponent() {
    const [mounted, setMounted] = useState(false);
    const { user, isLoading, isAuthenticated } = useAuth();
    const logoutMutation = useLogout();

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="flex z-[100] items-center px-8 justify-between h-[80px] bg-white border-b border-gray-200 shadow-sm">
            {/* Logo */}
            <section className="flex items-center space-x-3">
                <Link href="/" aria-label="Go to home page" className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        <Image
                            src="/logo1.png"
                            alt="CodeAdvisor Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-primary">CodeAdvisors</h1>
                        <p className="text-xs text-gray-500">Developer Community</p>
                    </div>
                </Link>
            </section>

            {/* Search Section */}
            <div className="flex flex-1 justify-center max-w-2xl mx-8">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search articles, discussions, and more..."
                        className="w-full h-[44px] text-sm rounded-xl border-2 border-gray-200 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-0 transition-colors bg-gray-50 focus:bg-white"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
                {!mounted || isLoading ? (
                    // Loading state or not mounted yet
                    <div className="flex items-center space-x-3">
                        <Link href="/auth/login">
                            <Button 
                                variant="outline" 
                                className="h-[44px] px-6 border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold rounded-xl transition-all duration-200"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button className="h-[44px] px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                ) : isAuthenticated && user ? (
                    // Logged in - show user menu
                    <>
                        {/* Create Post Button */}
                        <Link href="/content/new">
                            <Button className="h-[44px] px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30">
                                <PenSquare className="w-4 h-4 mr-2" />
                                Create Post
                            </Button>
                        </Link>

                        {/* Notifications */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                        >
                            <Bell className="h-5 w-5 text-gray-600" />
                            {/* Notification badge */}
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage 
                                            src={user.avatarUrl || DEFAULT_AVATAR} 
                                            alt={user.username} 
                                        />
                                        <AvatarFallback className="bg-primary text-white">
                                            {user.firstName?.[0]}{user.lastName?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            @{user.username}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/user/${user.username}`} className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/edituser" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                    disabled={logoutMutation.isPending}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>{logoutMutation.isPending ? 'Logging out...' : 'Log out'}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    // Not logged in - show login buttons
                    <>
                        <Link href="/auth/login">
                            <Button 
                                variant="outline" 
                                className="h-[44px] px-6 border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold rounded-xl transition-all duration-200"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button className="h-[44px] px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30">
                                Get Started
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

