"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediate redirect to /home without showing loading
    router.replace("/home");
  }, [router]);

  // Return null or minimal content during instant redirect
  return null;
}
