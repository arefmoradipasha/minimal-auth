import type { RandomUser } from "@/types/random-user.type"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: RandomUser
  error?: string
}

class AuthService {
  private readonly API_URL = "https://randomuser.me/api/?results=1&nat=us&seed=1718c72b9bcd1d99"

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(this.API_URL)

      if (!response.ok) {
        return {
          success: false,
          error: "خطا در برقراری ارتباط با سرور",
        }
      }

      const data = await response.json()
      const userData: RandomUser = data.results[0]

      const apiEmail = userData.email
      const apiPassword = userData.login.password

      if (credentials.email === apiEmail && credentials.password === apiPassword) {
        return {
          success: true,
          user: userData,
        }
      } else {
        return {
          success: false,
          error: "ایمیل یا پسورد اشتباه است.",
        }
      }
    } catch (error) {
        console.log(error)
      return {
        success: false,
        error: "خطای غیرمنتظره رخ داد",
      }
    }
  }
}

export const authService = new AuthService()
