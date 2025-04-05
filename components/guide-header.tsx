"use client"

import { Button } from "@/components/ui/button"
import { Save, ArrowLeft } from "lucide-react"
import { useRef, useState } from "react"
import { Input } from "./ui/input"

interface GuideHeaderProps {
  title: string
  onSave: () => void
  onBack: () => void
  onTitleSave: (ago0: string) => void
}

export function GuideHeader({ title, onSave, onBack, onTitleSave }: GuideHeaderProps) {
  const [editingTitle, setEditingStatus] = useState(false)

  const [guideTitle, updateTitle] = useState(title)

  const inputRef = useRef<HTMLInputElement>(null)

  const toggleEditTitle = () => {
    if (editingTitle) {
      onTitleSave(guideTitle)
      inputRef.current?.blur()
    }

    setEditingStatus(prev => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Input is changing for title..", e)
    updateTitle(e.target.value)
  }

  const handleTitleSave = () => {
    console.log("SAVING TITLE")
    setEditingStatus(false)
    onTitleSave(guideTitle)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      toggleEditTitle()
  }

  return (
    <header className="flex items-center justify-between px-3 py-2 border-b border-border bg-background">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {/* {
          !editingTitle ?
            <div onClick={toggleEditTitle}>
              <h1 className="text-lg font-semibold">{guideTitle}</h1>
            </div>
            : */}
        <div onClick={handleTitleSave} onBlur={handleTitleSave}>
          <Input
            ref={inputRef}
            value={guideTitle}
            onChange={handleInputChange}
            placeholder="Ask AI for help with this section..."
            onKeyDown={handleEnterKey}
            className={`flex-grow ease-linear duration-150 border-none font-semibold focus-visible:font-normal`}
          />
        </div>
        {/* } */}
      </div>
      <Button onClick={onSave} className="text-xs">
        <Save className="h-3 w-3 mr-2" />
        Save Guide
      </Button>
    </header>
  )
}

