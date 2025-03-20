"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <motion.div whileHover={{ rotate: 20 }} transition={{ duration: 0.2 }}>
            <Globe className="h-5 w-5" />
          </motion.div>
          <span className="sr-only">Select language</span>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hi")}>हिंदी (Hindi)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("kn")}>ಕನ್ನಡ (Kannada)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

