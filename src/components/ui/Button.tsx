import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "motion/react"

//icons: https://www.npmjs.com/package/pixelarticons


type ButtonProps = HTMLMotionProps<"button"> & {
    children: ReactNode
    variant?: "primary" | "ghost"
}

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
    const baseClasses = "py-2 transition-colors"
    const variantClasses =
        variant === "ghost"
            ? "bg-transparent text-gray-300 hover:text-white "
            : "bg-blue-500 text-white hover:bg-red-700"

    const text =
        typeof children === "string" || typeof children === "number"
            ? String(children)
            : null

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses} ${className}`.trim()}
            initial="rest"
            animate="rest"
            whileHover="hover"
            {...props}
        >
            {text === null ? (
                children
            ) : (
                <span className="relative block overflow-hidden leading-none">
                    <span className="invisible">{text}</span>
                    <span className="absolute inset-0 flex">
                        {text.split("").map((char, index) => {
                            const glyph = char === " " ? "\u00A0" : char

                            return (
                                <span className="relative inline-block overflow-hidden" key={`${char}-${index}`}>
                                    <motion.span
                                        className="block whitespace-pre"
                                        variants={{ rest: { y: "0%" }, hover: { y: "100%" } }}
                                        transition={{ duration: 0.22, ease: "easeInOut", delay: index * 0.02 }}
                                    >
                                        {glyph}
                                    </motion.span>
                                    <motion.span
                                        className="absolute left-0 top-0 block whitespace-pre"
                                        variants={{ rest: { y: "-100%" }, hover: { y: "0%" } }}
                                        transition={{ duration: 0.22, ease: "easeInOut", delay: index * 0.02 }}
                                    >
                                        {glyph}
                                    </motion.span>
                                </span>
                            )
                        })}
                    </span>
                </span>
            )}
        </motion.button>
    )
}