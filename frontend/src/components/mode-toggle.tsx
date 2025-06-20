import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme(); // Get the current theme as well

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // Toggle between dark and light
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {" "}
      {/* Add onClick handler */}
      {theme === "dark" ? ( // Conditionally render icon based on theme
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
