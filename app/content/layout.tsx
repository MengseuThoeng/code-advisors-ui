import { SidebarProvider } from "@/components/ui/sidebarContent";
import { koh_Santepheap, roboto } from "../fonts/fonts";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Footer from "@/components/footer/Footer";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} h-full relative`}
      >
        <header className="bg-white fixed top-0 right-0 left-0 z-50">
          <NavbarComponent />
        </header>

        <SidebarProvider>
          <main className="bg-gray-100 w-full ">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
