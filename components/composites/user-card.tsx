/* eslint-disable @next/next/no-img-element */
"use client"
import { useRouter } from "next/navigation"
import styles from "@/styles/user-card.module.scss"
import Typography from "@/components/primitives/typography"
import Button from "@/components/primitives/button"
import { useAuth } from "@/context/AuthContext"

export default function UserCard() {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    setUser(null)
    router.push("/login")
  }

  if (!user) {
    return (
      <div className={styles.card}>
        <Typography variant="h2">در حال بارگذاری...</Typography>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img
            src={user.picture.large || "/placeholder.svg"}
            alt={`${user.name.first} ${user.name.last}`}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.userInfo}>
          <Typography variant="h2" className={styles.welcomeText}>
            خوش آمدید به داشبورد
          </Typography>
          <Typography variant="h3" className={styles.userName}>
            {user.name.first} {user.name.last}
          </Typography>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Typography variant="body">{user.email}</Typography>
          <Typography variant="small" className={styles.label}>
            ایمیل
          </Typography>
        </div>
        <div className={styles.detailItem}>
          <Typography variant="body">{user.phone}</Typography>
          <Typography variant="small" className={styles.label}>
            تلفن
          </Typography>
        </div>
        <div className={styles.detailItem}>
          <Typography variant="body">{user.location.country}</Typography>
          <Typography variant="small" className={styles.label}>
            کشور
          </Typography>
        </div>
        <div className={styles.detailItem}>
          <Typography variant="body">{user.location.city}</Typography>
          <Typography variant="small" className={styles.label}>
            شهر
          </Typography>
        </div>
      </div>

      <div className={styles.actions}>
        <Button onClick={handleLogout}>خروج از حساب</Button>
      </div>
    </div>
  )
}
