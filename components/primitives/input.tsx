"use client"
import { forwardRef } from "react"
import styles from "@/styles/components.module.scss"
import type { InputProps } from "@/types/InputProps.type"

interface ExtendedInputProps extends InputProps {
  hasError?: boolean
}

const Input = forwardRef<HTMLInputElement, ExtendedInputProps>(
  (
    { id, label, type = "text", value, placeholder = "", onChange, required = false, className = "", hasError = false },
    ref,
  ) => (
    <div className={`${styles.inputGroup} ${hasError ? styles.hasError : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={`${styles.input} ${hasError ? styles.error : ""} ${className}`}
      />
    </div>
  ),
)

Input.displayName = "Input"

export default Input
