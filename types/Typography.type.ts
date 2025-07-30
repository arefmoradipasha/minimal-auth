import type { ReactNode } from "react"

export type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "small"

export interface TypographyProps {
  variant?: Variant
  children: ReactNode
  className?: string
}
