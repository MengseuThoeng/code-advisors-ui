import React from 'react';

export function Avatar({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src }: { src: string }) {
  return <img src={src} alt="Avatar" className="w-full h-full object-cover" />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full flex items-center justify-center bg-gray-300">{children}</div>;
}