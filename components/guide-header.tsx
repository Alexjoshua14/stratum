"use client"

import { Button } from "@/components/ui/button"
import { Save, ArrowLeft } from "lucide-react"

interface GuideHeaderProps {
  title: string
  onSave: () => void
  onBack: () => void
}

export function GuideHeader({ title, onSave, onBack }: GuideHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-background">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <Button onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save Guide
      </Button>
    </header>
  )
}

