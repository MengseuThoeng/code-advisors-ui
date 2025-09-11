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
import Image from "next/image";

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
    id: "articles",
    label: "Articles",
    href: "/home",
    icon: FileText,
    description: "Browse all content"
  },
  {
    id: "trending",
    label: "Trending",
    href: "/content/trending", 
    icon: TrendingUp,
    description: "What's hot now"
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
    href: "/users",
    icon: Users,
    description: "Discover developers"
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
    label: "Tags",
    href: "/tags",
    icon: Tag,
    description: "Browse all tags"
  },
];

const developerTools: NavItem[] = [
  {
    id: "loading-demo",
    label: "Loading Demo",
    href: "/loading-demo",
    icon: Code,
    description: "Random loading system"
  },
  {
    id: "loading-test",
    label: "Loading Lab",
    href: "/loading-test",
    icon: Search,
    description: "Test all loadings"
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  // Hide sidebar on specific pages
  const hiddenPaths = [
    "/content/new",
    "/edituser",
    "/about",
    "/auth/login",
    "/auth/register", 
    "/auth/otp",
    "/auth/forgot-password"
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
      <Link href={item.href} className="block">
        <div 
          className={`group relative w-full h-14 px-4 rounded-xl transition-all duration-300 cursor-pointer ${
            isActive(item.href)
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
          }`}
        >
          <div className="flex items-center space-x-4 h-full">
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
        </div>
      </Link>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="w-80 border-r border-gray-200/60 bg-white shadow-lg">
      {/* Header with brand colors */}
      

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

        {/* Developer Tools */}
        <div>
          <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-6 px-2">
            Developer
          </h3>
          <SidebarMenu className="space-y-2">
            {developerTools.map(renderNavItem)}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
