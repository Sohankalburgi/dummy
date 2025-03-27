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
import { Loader2, Leaf, Mail, Lock, ArrowRight } from "lucide-react"
import axios from "axios"
import logo from "../../public/Krishi Bhoomi AI.png"
import { useRouter } from "next/navigation"
import Image from "next/image"
export default function LoginPage() {
  const { t } = useLanguage()
  const { login, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {

      const response = await axios.post(`http://localhost:4000/user/login`, {
        data: {
          email: email,
          password: password,
        },
        headers: {
          'Accept-Language': 'en',
        }
      })
      console.log(response.data);
      if (response.status === 200 && response.data.success == true) {
        const token = response.data.token;
        const user = response.data.user;
        login({...user, token : token});
      }
      else if(response.data.success === false) {
       setError(response.data.message)
      }
    } catch (error: any) {
      setError(error.message);
    } 
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white p-8 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
            </div>
            <span className="font-bold text-2xl">{t("app.name")}</span>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{t("dashboard.welcome")}</h1>
          <p className="text-xl opacity-90">{t("dashboard.subtitle")}</p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              </div>
              <h3 className="font-medium">Disease Detection</h3>
              <p className="text-sm opacity-80">Advanced AI for early detection of areca nut diseases</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              </div>
              <h3 className="font-medium">Drone Monitoring</h3>
              <p className="text-sm opacity-80">Aerial surveillance for comprehensive crop analysis</p>
            </div>
          </div>
        </div>

        <div className="text-sm opacity-70">© 2025 Krishi Bhoomi AI. All rights reserved.</div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
          <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
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
                {t("auth.login")}
              </CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      {t("auth.password")}
                    </Label>
                    <Link
                      href="#"
                      className="text-xs text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      {t("auth.forgotPassword")}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("auth.login")}...
                    </>
                  ) : (
                    <>
                      {t("auth.login")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                {t("auth.noAccount")}{" "}
                <Link
                  href="/signup"
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                >
                  {t("auth.signup")}
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

