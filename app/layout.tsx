/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { roboto, koh_Santepheap } from "./fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} min-h-screen`}
      >
        <SidebarProvider>
          <header className="bg-white border border-gray-200 fixed top-0 left-0 right-0 z-50">
            <NavbarComponent />
          </header>
          <AppSidebar />
          <main className="w-full pt-16 min-h-[calc(100vh-80px)]">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
