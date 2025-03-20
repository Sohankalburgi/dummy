"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <motion.div
        whileHover={{ rotate: 45 }}
        transition={{ duration: 0.2 }}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        whileHover={{ rotate: -45 }}
        transition={{ duration: 0.2 }}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

