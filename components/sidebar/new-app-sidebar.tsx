"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  FileText,
  MessageSquare,
  Bookmark,
  Clock,
  TrendingUp,
  Users,
  Tag,
  Search,
  Code,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Modern sidebar with CodeAdvisor brand colors
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: any;
  description?: string;
}

const mainNavigation: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    icon: Home,
    description: "Your dashboard"
  },
  {
    id: "explore",
    label: "Explore",
    href: "/content",
    icon: Search,
    description: "Discover content"
  },
  {
    id: "trending",
    label: "Trending",
    href: "/content/trending", 
    icon: TrendingUp,
    description: "What's hot now"
  },
  {
    id: "articles",
    label: "Articles",
    href: "/content",
    icon: FileText,
    description: "Browse articles"
  },
  {
    id: "discussions",
    label: "Forum", 
    href: "/forum",
    icon: MessageSquare,
    description: "Join discussions"
  },
  {
    id: "community",
    label: "Community",
    href: "/community",
    icon: Users,
    description: "Connect with devs"
  },
];

const personalSpace: NavItem[] = [
  {
    id: "bookmarks",
    label: "Saved",
    href: "/bookmark",
    icon: Bookmark,
    description: "Your bookmarks"
  },
  {
    id: "history", 
    label: "History",
    href: "/reading-history",
    icon: Clock,
    description: "Recently viewed"
  },
  {
    id: "tags",
    label: "Topics",
    href: "/content/tags",
    icon: Tag,
    description: "Browse topics"
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  // Hide sidebar on specific pages
  const hiddenPaths = [
    "/content/new",
    "/user", 
    "/edituser",
    "/about"
  ];

  if (hiddenPaths.includes(pathname) || 
      (pathname.startsWith("/content/") && !pathname.includes("/content/tags"))) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/home") return pathname === "/home" || pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const renderNavItem = (item: NavItem) => (
    <SidebarMenuItem key={item.id}>
      <Link href={item.href}>
        <SidebarMenuButton 
          className={`group relative w-full h-14 px-4 rounded-xl transition-all duration-300 ${
            isActive(item.href)
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2.5 rounded-lg transition-all duration-300 ${
              isActive(item.href) 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className={`font-semibold text-sm ${
                isActive(item.href) ? 'text-white' : 'text-gray-900 group-hover:text-primary'
              }`}>
                {item.label}
              </div>
              {item.description && (
                <div className={`text-xs mt-0.5 ${
                  isActive(item.href) ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {item.description}
                </div>
              )}
            </div>
          </div>
          
          {/* Active indicator */}
          {isActive(item.href) && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
          )}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="w-80 h-screen border-r border-gray-200/60 bg-white shadow-lg">
      {/* Header with brand colors */}
      <SidebarHeader className="p-6 bg-gradient-to-br from-primary to-primary/90 border-b border-primary/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-white">CodeAdvisor</h2>
            <p className="text-sm text-white/80">Developer Hub</p>
          </div>
        </div>
        
        {/* Header accent line */}
        <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-6 px-2">
            Explore
          </h3>
          <SidebarMenu className="space-y-2">
            {mainNavigation.map(renderNavItem)}
          </SidebarMenu>
        </div>

        {/* Personal Space */}
        <div>
          <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-6 px-2">
            Your Space
          </h3>
          <SidebarMenu className="space-y-2">
            {personalSpace.map(renderNavItem)}
          </SidebarMenu>
        </div>

        {/* Activity Stats Card */}
        <div className="mx-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-secondary" />
            </div>
            <h4 className="font-bold text-primary">Your Progress</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Articles Read</span>
              <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg text-sm">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Discussions</span>
              <span className="font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-lg text-sm">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bookmarks</span>
              <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg text-sm">12</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
