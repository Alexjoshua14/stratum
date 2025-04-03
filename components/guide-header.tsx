"use client"

import { Button } from "@/components/ui/button"
import { Save, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"

interface GuideHeaderProps {
  title: string
  onSave: () => void
  onBack: () => void
  onTitleSave: () => void
}

export function GuideHeader({ title, onSave, onBack, onTitleSave }: GuideHeaderProps) {
  const [editingTitle, setEditingStatus] = useState(false)

  const [guidetitle, updateTitle] = useState(title)

  const toggleEditTitle = () => {
    if (editingTitle) {
      onTitleSave()
    }

    setEditingStatus(prev => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Input is changing for title..", e)
  }

  return (
    <header className="flex items-center justify-between px-3 py-3 border-b border-border bg-background">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {/* {
          !editingTitle ?
            <div onClick={toggleEditTitle}>
              <h1 className="text-lg font-semibold">{guidetitle}</h1>
            </div>
            : */}
        <div onClick={toggleEditTitle}>
          <Input
            value={guidetitle}
            onChange={handleInputChange}
            placeholder="Ask AI for help with this section..."
            onKeyDown={(e) => e.key === "Enter" && toggleEditTitle}
            className={`flex-grow ease-linear duration-150 border-none font-semibold focus-visible:font-normal`}
          />
        </div>
        {/* } */}
      </div>
      <Button onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save Guide
      </Button>
    </header>
  )
}

