import { Dropdown, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Settings, User, Plus, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

export function NavbarLogin() {
  return (
    <Navbar
      fluid
      rounded
      className="flex z-[100] items-center px-8 justify-between h-[80px] bg-white border-b border-gray-200 shadow-sm"
    >
      {/* Navbar Brand */}
      <NavbarBrand href="/">
        <div className="mr-16 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <Image
              src="/logo1.png"
              alt="Code Advisors Logo"
              width={24}
              height={24}
              className="filter invert brightness-0 contrast-100"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl text-primary">CodeAdvisor</h1>
            <p className="text-xs text-gray-500">Developer Community</p>
          </div>
        </div>
      </NavbarBrand>

      {/* Search Bar */}
      <div className="flex flex-1 justify-center max-w-2xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search articles, discussions, and more..."
            className="w-full h-[44px] text-sm rounded-xl border-2 border-gray-200 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-0 transition-colors bg-gray-50 focus:bg-white"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m2.85-6.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4">
        {/* Create New Button */}
        <Dropdown
          inline
          label={
            <button className="flex items-center space-x-2 bg-primary hover:bg-primary/90 px-4 py-2.5 rounded-xl text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-semibold">Create</span>
            </button>
          }
        >
          <DropdownItem className="text-gray-700 hover:text-primary hover:bg-primary/5 font-medium">
            <a href="/content/new" className="w-full block">Write Article</a>
          </DropdownItem>
          <DropdownItem className="text-gray-700 hover:text-primary hover:bg-primary/5 font-medium">
            <a href="/forum/new" className="w-full block">Ask Question</a>
          </DropdownItem>
        </Dropdown>

        {/* Notification Icon */}
        <a href="/notification">
          <button className="relative p-3 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white font-bold">
              3
            </span>
          </button>
        </a>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarImage src="/user.jpg" alt="User avatar" />
                <AvatarFallback className="bg-primary text-white font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-primary">John Doe</p>
                <p className="text-xs text-gray-500">Developer</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2" align="end">
            <div className="px-3 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/user.jpg" alt="User avatar" />
                  <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-primary">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                  <p className="text-xs text-secondary">Premium Member</p>
                </div>
              </div>
            </div>
            
            <DropdownMenuGroup className="py-2">
              <a href="/user">
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary">
                  <User className="mr-3 h-4 w-4" />
                  <span className="font-medium">My Profile</span>
                </DropdownMenuItem>
              </a>
              <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary">
                <Settings className="mr-3 h-4 w-4" />
                <span className="font-medium">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="mr-3 h-4 w-4" />
                    <span className="font-medium">Dark Mode</span>
                  </div>
                  <Switch />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-secondary hover:bg-secondary/5 hover:text-secondary">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-medium">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Navbar>
  );
}

export default NavbarLogin;
