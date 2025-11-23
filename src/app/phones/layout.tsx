"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Link from "next/link";

export default function PhonesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="relative top-3" />
      <div className="content my-0 mx-auto w-full">
        <Link
          href="/"
          className="back-home-link inline-block p-4 text-sm font-medium hover:underline underline-offset-4 transition-all"
        >
          {"<- Додому"}
        </Link>

        {children}
      </div>
    </SidebarProvider>
  );
}
