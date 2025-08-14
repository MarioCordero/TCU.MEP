import * as React from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { cn } from '../../lib/utils'
import { Atom, X, ArrowLeft, Home } from 'lucide-react'

interface HeaderProps {
  title?: string
  subtitle?: string
  showBackButton?: boolean
  showCloseButton?: boolean
  showHomeButton?: boolean
  backPath?: string
  variant?: 'default' | 'transparent' | 'solid'
  className?: string
  badge?: {
    text: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

const Header = React.forwardRef<
  HTMLElement,
  HeaderProps
>(({ 
  title = "ChemMaster", 
  subtitle,
  showBackButton = false,
  showCloseButton = false,
  showHomeButton = false,
  backPath,
  variant = 'default',
  className,
  badge,
  ...props 
}, ref) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backPath) {
      navigate(backPath)
    } else {
      navigate(-1)
    }
  }

  const variantClasses = {
    default: "bg-gradient-to-r from-[#A358F7] to-[#527AF6] text-white border-b border-white/20",
    transparent: "bg-transparent",
    solid: "bg-gradient-to-r from-[#A358F7] to-[#527AF6] text-white border-b border-white/20"
  }

  return (
    <header 
      ref={ref}
      className={cn(
        "sticky top-0 z-50 shadow-lg",  // Added shadow for better visibility
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation & Logo */}
          <div className="flex items-center gap-3">
            {/* Navigation Buttons */}
            {(showBackButton || showCloseButton || showHomeButton) && (
              <div className="flex items-center gap-2">
                {showBackButton && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleBack}
                    className="hover:bg-white/20 text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                
                {showCloseButton && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate('/')}
                    className="hover:bg-white/20 text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
                
                {showHomeButton && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate('/')}
                    className="hover:bg-white/20 text-white"
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )}

            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                {subtitle && (
                  <p className="text-xs text-white/80">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Badge or other actions */}
          {badge && (
            <Badge 
              variant={badge.variant}
              className={cn(
                "bg-white/20 text-white border-white/30",
                badge.variant === 'default' && "bg-white/20 text-white border-0"
              )}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      </div>
    </header>
  )
})

Header.displayName = "Header"

export { Header }
export type { HeaderProps }