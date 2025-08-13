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
        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div 
        className={cn(
          "fixed top-0 z-50 h-full w-64 bg-white shadow-xl transition-transform lg:hidden",
          side === "left" ? "left-0" : "right-0",
          open ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  )
}