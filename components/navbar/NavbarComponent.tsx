import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NavbarComponent() {
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
        </div>
    );
}

