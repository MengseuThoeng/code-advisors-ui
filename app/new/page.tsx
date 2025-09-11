"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RandomLoadingSystem from '@/components/RandomLoadingSystem';

export default function NewRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/content/new");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <RandomLoadingSystem size="lg" />
      </div>
    </div>
  );
}
