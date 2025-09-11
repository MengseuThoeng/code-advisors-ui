"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages where navbar and sidebar should be hidden
  const authPaths = [
    "/auth/login",
    "/auth/register", 
    "/auth/otp",
    "/auth/forgot-password"
  ];

  const isAuthPage = authPaths.some(path => pathname.startsWith(path));

  if (isAuthPage) {
    // Auth pages: no navbar, no sidebar, full screen
    return (
      <main className="w-full min-h-screen">
        {children}
      </main>
    );
  }

  // Regular pages: with navbar and sidebar
  return (
    <SidebarProvider>
      <header className="bg-white border border-gray-200 fixed top-0 left-0 right-0 z-50">
        <NavbarComponent />
      </header>
      <AppSidebar />
      <main className="w-full pt-16 min-h-[calc(100vh-80px)]">
        {children}
      </main>
    </SidebarProvider>
  );
}
