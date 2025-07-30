"use client"
import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { RandomUser } from "@/types/random-user.type"

interface AuthContextType {
  user: RandomUser | null
  setUser: (u: RandomUser | null) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RandomUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem("auth_user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("auth_user")
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (loading) return

    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("auth_user")
    }
  }, [user, loading])

  useEffect(() => {
    if (loading) return

    if (pathname === "/login" && user) {
      router.replace("/dashboard")
      return
    }

    const protectedPaths = ["/dashboard"]
    if (protectedPaths.includes(pathname) && !user) {
      router.replace("/login")
      return
    }
  }, [pathname, user, loading, router])

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(" AuthContext باید درون AuthProvider استفاده شود")
  }
  return context
}
