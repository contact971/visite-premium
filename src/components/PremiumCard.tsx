// src/components/PremiumCard.tsx
import { ReactNode } from "react"

export default function PremiumCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-black/60 border border-yellow-600 rounded-2xl shadow-xl p-5 backdrop-blur-sm hover:scale-[1.02] transition ${className}`}
    >
      {children}
    </div>
  )
}