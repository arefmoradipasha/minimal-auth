"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import styles from "@/styles/home.module.scss"
import Button from "@/components/primitives/button"
import Typography from "@/components/primitives/typography"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleLogin = () => {
    router.push("/login")
  }

  const handleDashboard = () => {
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <Typography variant="body">در حال بارگذاری...</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography variant="h1" className={styles.title}>
            خوش آمدید
          </Typography>
          <Typography variant="body" className={styles.subtitle}>
            سیستم احراز هویت ساده
          </Typography>
        </div>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.userSection}>
              <Typography variant="h3" className={styles.welcomeText}>
                سلام {user.name.first} {user.name.last}!
              </Typography>
              <Button onClick={handleDashboard}>رفتن به داشبورد</Button>
            </div>
          ) : (
            <div className={styles.guestSection}>
              <Typography variant="body" className={styles.guestText}>
                برای استفاده از سیستم وارد شوید
              </Typography>
              <Button onClick={handleLogin}>ورود به سیستم</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
