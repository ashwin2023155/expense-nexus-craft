
import { FC, ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider className="w-full min-h-screen">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6 animate-in">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
