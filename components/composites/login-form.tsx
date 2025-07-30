"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import styles from "@/styles/login-form.module.scss"
import Input from "@/components/primitives/input"
import Button from "@/components/primitives/button"
import Typography from "@/components/primitives/typography"
import { useAuth } from "@/context/AuthContext"
import { loginSchema } from "@/schemas/login.schema"
import { authService } from "@/service/auth.service"

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormValues>({
    email: "erik.chavez@example.com",
    password: "bomber",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { setUser } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof LoginFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setServerError(null)
    setErrors({})

    try {
      const validatedData = loginSchema.parse(form)

      const authResponse = await authService.login(validatedData)
      if (authResponse.success && authResponse.user) {
        setUser(authResponse.user)
        router.push("/dashboard")
      } else {
        setServerError(authResponse.error || "خطای نامشخص")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof LoginFormValues, string>> = {}
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof LoginFormValues] = issue.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setServerError("خطای غیرمنتظره رخ داد")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <Typography variant="h1" className={styles.title}>
            ورود کاربران
          </Typography>
        </div>

        <Input
          id="email"
          label="ایمیل"
          type="email"
          value={form.email}
          placeholder="user@example.com"
          onChange={handleChange}
          hasError={!!errors.email}
          required
        />
        {errors.email && (
          <Typography variant="small" className={styles.error}>
            {errors.email}
          </Typography>
        )}

        <Input
          id="password"
          label="پسورد"
          type="password"
          value={form.password}
          placeholder="********"
          onChange={handleChange}
          hasError={!!errors.password}
          required
        />
        {errors.password && (
          <Typography variant="small" className={styles.error}>
            {errors.password}
          </Typography>
        )}

        {serverError && (
          <Typography variant="small" className={styles.serverError}>
            {serverError}
          </Typography>
        )}
      <Typography variant="body"> ایمیل و رمز عبور بصورت دیفالت جهت تست قرار داده شده میتوانید تغییر دهید </Typography>

        <Button type="submit" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود"}
        </Button>


      </form>

    </div>
  )
}
