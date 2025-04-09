
import { AuthForm } from "@/components/auth/auth-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FileTextIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="rounded-md bg-primary/20 p-2">
          <FileTextIcon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">ExpenseNexus</h1>
          <p className="text-sm text-muted-foreground">Event Expense Management System</p>
        </div>
      </div>
      
      <div className="w-full max-w-md">
        <AuthForm mode="login" />
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 ExpenseNexus. All rights reserved.</p>
        <p className="mt-1">Created by Ashwin Sajin, Darsh Gupta, Adi Bajpai, Deepak Kumar</p>
      </footer>
    </div>
  );
}
