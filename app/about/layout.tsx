import { roboto, koh_Santepheap } from "@/app/fonts/fonts";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/error";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ErrorBoundary errorComponent={Error}>
        <header className="bg-white border border-gray-200 fixed top-0 right-0 left-0 z-50">
          <NavbarComponent />
        </header>
        <main className={`${roboto.variable} ${koh_Santepheap.variable}`}>
          {children}
        </main>
      </ErrorBoundary>
    </>
  );
}