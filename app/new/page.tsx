"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/content/new");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CD3937] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to content creation...</p>
      </div>
    </div>
  );
}
