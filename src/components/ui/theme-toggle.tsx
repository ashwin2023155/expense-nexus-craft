
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light", savedTheme === "light");
    } else {
      // Default to dark mode
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
    
    toast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`, {
      description: `Switched to ${newTheme} mode`,
      duration: 2000,
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-md">
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-200" />
      ) : (
        <Moon className="h-4 w-4 text-blue-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
