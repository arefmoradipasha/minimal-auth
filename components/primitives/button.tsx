"use client"
import { forwardRef } from "react"
import styles from "@/styles/components.module.scss"
import type { ButtonProps } from "@/types/ButtonProps.type"

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, type = "button", disabled = false, }, ref) => (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {children}
    </button>
  ),
)

Button.displayName = "Button"

export default Button
