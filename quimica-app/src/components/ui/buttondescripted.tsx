import * as React from "react"
import { cn } from "@/lib/utils"

type GradientVariant = 
  | "blue-purple"
  | "pink-orange"
  | "green-blue"
  | "purple-pink"
  | "orange-red"
  | "cyan-blue"
  | "custom"

type IconVariant = 
  | "arrow-right"
  | "check"
  | "plus"
  | "star"
  | "heart"
  | "download"
  | "upload"
  | "custom"

interface ButtonDescriptedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  subtitle?: string
  icon?: IconVariant
  customIcon?: React.ReactNode
  gradient?: GradientVariant
  customGradient?: string
  iconBg?: string
}

const gradientMap: Record<Exclude<GradientVariant, "custom">, string> = {
  "blue-purple": "bg-gradient-to-r from-blue-500 to-purple-600",
  "pink-orange": "bg-gradient-to-r from-pink-500 to-orange-500",
  "green-blue": "bg-gradient-to-r from-green-500 to-blue-500",
  "purple-pink": "bg-gradient-to-r from-purple-500 to-pink-500",
  "orange-red": "bg-gradient-to-r from-orange-500 to-red-500",
  "cyan-blue": "bg-gradient-to-r from-cyan-500 to-blue-500",
}

const iconMap: Record<Exclude<IconVariant, "custom">, React.ReactNode> = {
  "arrow-right": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  "check": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  "plus": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  "star": (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "heart": (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  "download": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  "upload": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
}

const ButtonDescripted = React.forwardRef<HTMLButtonElement, ButtonDescriptedProps>(
  ({ className, title, subtitle, icon, customIcon, gradient = "blue-purple", customGradient, iconBg = "bg-white/20", ...props }, ref) => {
    const gradientClass = gradient === "custom" ? customGradient : gradientMap[gradient]
    const iconElement = icon === "custom" ? customIcon : (icon ? iconMap[icon] : null)
    
    return (
      <button 
        ref={ref} 
        className={cn(
          "relative rounded-lg p-6 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-left",
          gradientClass,
          className
        )} 
        {...props}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/90 text-base">
                {subtitle}
              </p>
            )}
          </div>
          {iconElement && (
            <div className={cn(
              "flex-shrink-0 ml-4 w-12 h-12 rounded-full flex items-center justify-center",
              iconBg
            )}>
              {iconElement}
            </div>
          )}
        </div>
      </button>
    )
  }
)

ButtonDescripted.displayName = "ButtonDescripted"

export { ButtonDescripted }