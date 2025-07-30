import type React from "react"
export interface InputProps {
  id: string
  label: string
  type?: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}
