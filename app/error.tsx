"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XIcon, CircleIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" min-h-screen flex items-center justify-center ">
      {/* Fullscreen background */}
      <div className="absolute inset-0 w-full h-full  bg-white"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <p className="absolute top-[40%] right-[38%] font-semibold text-[#000033] text-xl">
          OOPS!
        </p>
        <XIcon className="absolute top-[20%] left-[30%] w-8 h-8 lg:w-6 lg:h-6 text-primary" strokeWidth={8} />
        <XIcon className="absolute top-[40%] right-[36%] w-8 h-8 lg:w-6 lg:h-6 text-secondary" strokeWidth={5} />
        <XIcon className="absolute bottom-[30%] right-[20%] w-10 h-10 lg:w-8 lg:h-8 text-primary" strokeWidth={8} />
        <CircleIcon className="absolute top-[15%] right-[15%] w-12 h-12 lg:w-10 lg:h-10 text-primary" strokeWidth={3} />
        <CircleIcon className="absolute bottom-[20%] left-[25%] w-12 h-12 lg:w-10 lg:h-10 text-primary" strokeWidth={3} />
      </div>

      {/* Unplugged cord illustration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-6 lg:ml-14">
        <img
          src="/about-us/error.png"
          alt="Unplugged electrical cord illustration"
          className="w-40 lg:w-60 h-auto max-w-full"
        />
      </div>

      {/* Main content */}
      <div className="text-center z-10 ">
        <h1 className="text-6xl lg:text-[120px] font-bold text-[#000033]">
          404
        </h1>
        <h2 className="text-xl lg:text-2xl font-semibold text-[#000033] mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-2">
          We&apos;re sorry. The page you requested could not be found.
        </p>
        <p className="text-gray-600 mb-4">Please go back to the home page.</p>
        <Button
          asChild
          className="text-white bg-secondary hover:bg-primary rounded-sm px-4 py-2"
          onClick={() => reset()}
        >
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
