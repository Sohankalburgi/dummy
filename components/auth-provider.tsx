"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
  fullName: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock login - in a real app, this would be an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, any email/password combination works
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        fullName: email.split("@")[0],
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (fullName: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Mock signup - in a real app, this would be an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        fullName,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

