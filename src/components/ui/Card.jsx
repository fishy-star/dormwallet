import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={ref}
        className={cn(
            "relative overflow-hidden rounded-sm border border-white/10 bg-card/60 backdrop-blur-md text-card-foreground shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] group",
            className
        )}
        {...props}
    >
        {/* Hover Border Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0">
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_theme('colors.primary.DEFAULT')]" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/30 rounded-tr-sm" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/30 rounded-bl-sm" />

        <div className="relative z-10">
            {children}
        </div>
    </motion.div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6 border-b border-white/5", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight font-mono uppercase text-primary/90",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-4", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
