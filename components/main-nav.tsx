"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Settings, MessageSquare, Leaf, Database, LogOut, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function MainNav() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: t("nav.home"),
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/services",
      label: t("nav.services"),
      icon: Settings,
      active: pathname === "/services",
    },
    {
      href: "/chatbot",
      label: t("nav.chatbot"),
      icon: MessageSquare,
      active: pathname === "/chatbot",
    },
    {
      href: "/crop-suggestion",
      label: t("nav.crop"),
      icon: Leaf,
      active: pathname === "/crop-suggestion",
    },
    {
      href: "/your-data",
      label: t("nav.data"),
      icon: Database,
      active: pathname === "/your-data",
    },
  ]

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-green-700 dark:text-green-400 hidden md:inline-block">
            {t("app.name")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5">
                <route.icon className="h-4 w-4" />
                <span>{route.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          {user && (
            <div className="flex items-center gap-2 ml-2">
              <Avatar className="h-8 w-8 border-2 border-green-200 dark:border-green-800">
                <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
                  {user.fullName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-primary">
                <LogOut className="h-4 w-4 mr-2" />
                <span>{t("nav.logout")}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-lg text-green-700 dark:text-green-400">{t("app.name")}</span>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>

              {user && (
                <div className="flex items-center gap-3 p-4 mb-4 bg-muted rounded-lg">
                  <Avatar className="h-10 w-10 border-2 border-green-200 dark:border-green-800">
                    <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
                      {user.fullName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}

              <nav className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    <Link
                      href={route.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                        route.active
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "hover:bg-muted",
                      )}
                    >
                      <route.icon className="h-5 w-5" />
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
                {user && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false)
                      logout()
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.logout")}
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

