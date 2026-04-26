import type { ButtonHTMLAttributes, ReactNode } from "react"

//icons: https://www.npmjs.com/package/pixelarticons


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: "primary" | "ghost"
}

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
    const baseClasses = "rounded px-3 py-2 text-sm font-medium transition-colors"
    const variantClasses =
        variant === "ghost"
            ? "bg-transparent text-gray-300 hover:text-white"
            : "bg-blue-500 text-white hover:bg-blue-700"

    return (
        <button className={`${baseClasses} ${variantClasses} ${className}`.trim()} {...props}>
            {children}
        </button>
    )
}