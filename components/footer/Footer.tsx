"use client";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Image
                  src="/logo1.png"
                  alt="CodeAdvisor Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">CodeAdvisor</h3>
                <p className="text-xs text-gray-500">Developer Hub</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering developers with knowledge, tools, and community to build amazing things.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Platform</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/content" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Articles
              </Link>
              <Link href="/forum" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Discussions
              </Link>
              <Link href="/bookmark" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Bookmarks
              </Link>
              <Link href="/content/tags" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Topics
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Company</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/CodeAdvisor-ISTAD"
                className="p-2 bg-gray-100 hover:bg-primary/10 rounded-lg transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-gray-600 group-hover:text-primary" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <Twitter className="h-5 w-5 text-gray-600 group-hover:text-primary" />
              </Link>
              <Link
                href="mailto:contact@codeadvisor.dev"
                className="p-2 bg-gray-100 hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <Mail className="h-5 w-5 text-gray-600 group-hover:text-primary" />
              </Link>
            </div>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Join our community</p>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span>1,200+ developers</span>
                <Heart className="w-3 h-3 fill-red-500 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 CodeAdvisor. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
