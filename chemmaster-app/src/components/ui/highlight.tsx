import * as React from "react"
import { cn } from "../../lib/utils"

interface HighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  gradient?: string
  iconBg?: string
}

const Highlight = React.forwardRef<HTMLDivElement, HighlightProps>(
  ({ className, title, subtitle, icon, gradient = "bg-gradient-to-r from-blue-500 to-purple-600", iconBg = "bg-white/20", ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(
          "relative rounded-lg p-6 text-white shadow-lg",
          gradient,
          className
        )} 
        {...props}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/90 text-base">
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div className={cn(
              "flex-shrink-0 ml-4 w-12 h-12 rounded-full flex items-center justify-center",
              iconBg
            )}>
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Highlight.displayName = "Highlight"

export { Highlight }