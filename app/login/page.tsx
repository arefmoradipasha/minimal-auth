import type { Metadata } from "next"
import LoginForm from "@/components/composites/login-form"
import styles from "@/styles/auth.module.scss"

export const metadata: Metadata = {
  title: "ورود به سیستم",
  description: "صفحه ورود به سیستم",
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  )
}
