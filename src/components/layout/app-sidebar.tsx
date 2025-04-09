
import { FC } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  HomeIcon, 
  CalendarIcon, 
  BarChart3Icon, 
  ReceiptIcon, 
  UsersIcon, 
  LogOutIcon,
  DollarSignIcon,
  UploadIcon,
  Settings2Icon,
  FileTextIcon,
  PlusIcon,
  CheckSquareIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

// The main menu items
const mainMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Events",
    path: "/events",
    icon: CalendarIcon,
  },
  {
    title: "Allocations",
    path: "/allocations",
    icon: DollarSignIcon,
    adminOnly: true,
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: ReceiptIcon,
  },
  {
    title: "Bills",
    path: "/bills",
    icon: UploadIcon,
  },
  {
    title: "Approvals",
    path: "/approvals",
    icon: CheckSquareIcon,
    adminOnly: true,
  },
];

// Secondary menu items
const reportMenuItems: MenuItem[] = [
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3Icon,
  },
  {
    title: "Users",
    path: "/users",
    icon: UsersIcon,
    adminOnly: true,
  },
];

// Mock user for demonstration - this would come from auth context in a real app
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
  role: "admin", // or "organizer"
};

export const AppSidebar: FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const isAdmin = user.role === "admin";

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/20 p-1">
            <FileTextIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">ExpenseNexus</span>
            <span className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "Organizer"}</span>
          </div>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold">MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems
                .filter(item => !item.adminOnly || (item.adminOnly && isAdmin))
                .map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-2", 
                          location.pathname === item.path && "text-primary"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold">REPORTS & SETTINGS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportMenuItems
                .filter(item => !item.adminOnly || (item.adminOnly && isAdmin))
                .map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-2", 
                          location.pathname === item.path && "text-primary"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className={cn(
                    "flex items-center gap-2", 
                    location.pathname === "/settings" && "text-primary"
                  )}>
                    <Settings2Icon className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold">QUICK ACTIONS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to={isAdmin ? "/events/new" : "/expenses/new"} 
                    className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>{isAdmin ? "New Event" : "Record Expense"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/bills/upload" 
                    className="flex items-center gap-2"
                  >
                    <UploadIcon className="h-4 w-4" />
                    <span>Upload Bill</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-md text-destructive hover:bg-destructive/10"
              asChild
            >
              <Link to="/auth/login">
                <LogOutIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
