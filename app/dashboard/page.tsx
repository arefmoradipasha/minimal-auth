import type { Metadata } from "next"
import styles from "@/styles/dashboard.module.scss"
import UserCard from "@/components/composites/user-card"

export const metadata: Metadata = {
  title: "دشبورد",
  description: "صفحه‌ی داشبورد کاربر",
}

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <UserCard />
    </div>
  )
}
