import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface SheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right"
}

export const Sheet: React.FC<SheetProps> = ({ 
  open, 
  onClose, 
  children,
  side = "left" 
}) => {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      
      {/* Sheet Container */}
      <div 
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        )}
        data-state={open ? "open" : "closed"}
      >
        {children}
      </div>
    </>
  )
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
}

export const SheetContent: React.FC<SheetContentProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {children}
    </div>
  )
}

interface SheetHeaderProps {
  children: React.ReactNode
  className?: string
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}>
      {children}
    </div>
  )
}

interface SheetTitleProps {
  children: React.ReactNode
  className?: string
}

export const SheetTitle: React.FC<SheetTitleProps> = ({ children, className }) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  )
}