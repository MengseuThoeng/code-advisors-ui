"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ForumPage() {
  const router = useRouter();

  useEffect(() => {
    // Show alert when someone navigates to /forum
    alert("Coming Soon! 🚀\n\nThe Forum feature is currently under development and will be available in 2026.\n\nThank you for your patience!");
    
    // Redirect back to home
    router.push("/home");
  }, [router]);

  return (
    <main className="bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </main>
  );
}
