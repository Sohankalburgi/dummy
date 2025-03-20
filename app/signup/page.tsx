"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"
import { motion } from "framer-motion"
import { Loader2, Leaf, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const { t } = useLanguage()
  const { signup, loading } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    try {
      await signup(fullName, email, password)
    } catch (err) {
      setError("Signup failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white p-8 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-bold text-2xl">{t("app.name")}</span>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Join Our Community</h1>
          <p className="text-xl opacity-90">Get access to advanced agricultural technology</p>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Real-time monitoring of your crops</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>AI-powered disease detection for areca nut plants</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Personalized crop recommendations</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Expert agricultural support</p>
            </div>
          </div>
        </div>

        <div className="text-sm opacity-70">© 2025 AgroTech. All rights reserved.</div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-green-700 dark:text-green-400">{t("app.name")}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-green-200 dark:border-green-800 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-green-700 dark:text-green-300">
                {t("auth.signup")}
              </CardTitle>
              <CardDescription className="text-center">Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    {t("auth.fullName")}
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    {t("auth.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    {t("auth.password")}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the{" "}
                    <Link href="#" className="text-green-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-green-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("auth.signup")}...
                    </>
                  ) : (
                    <>
                      {t("auth.signup")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                {t("auth.alreadyAccount")}{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                >
                  {t("auth.login")}
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-green-600 dark:hover:text-green-400">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

