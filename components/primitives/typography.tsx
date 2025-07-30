import type React from "react"
import styles from "@/styles/typography.module.scss"
import type { TypographyProps } from "@/types/Typography.type"

const Typography: React.FC<TypographyProps> = ({ variant = "body", children, className = "" }) => {
  const Tag = variant === "body" ? "p" : variant === "small" ? "small" : variant
  const variantClass = styles[variant] || styles.body

  return <Tag className={`${variantClass} ${className}`}>{children}</Tag>
}

export default Typography
