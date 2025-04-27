"use client"

import { Button } from "@/components/ui/button"
import { Save, ArrowLeft } from "lucide-react"
import { useRef, useState } from "react"
import { Input } from "./ui/input"
import { GuideList } from "./guide/guide-list"

interface GuideHeaderProps {
  title: string
  updateTitle: (title: string) => void
  guideID: string | null
  onSave: () => void
  onBack: () => void
  onTitleSave: (ago0: string) => void
  saveButtonDisabled: boolean
  updateSelectedGuide: (id: string) => Promise<boolean>
}

export function GuideHeader({ title, updateTitle, guideID, onSave, onBack, onTitleSave, saveButtonDisabled, updateSelectedGuide }: GuideHeaderProps) {
  const [editingTitle, setEditingStatus] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const toggleEditTitle = () => {
    if (editingTitle) {
      onTitleSave(title)
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
    onTitleSave(title)
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
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            : */}
        <div onClick={handleTitleSave} onBlur={handleTitleSave}>
          <Input
            ref={inputRef}
            value={title}
            onChange={handleInputChange}
            placeholder="Untitled Guide"
            onKeyDown={handleEnterKey}
            className={`h-8 ease-linear duration-150 border-none font-semibold focus-visible:font-normal`}
          />
        </div>
        {/* } */}
      </div>
      <div className="flex gap-8">
        <GuideList selectGuide={updateSelectedGuide} activeGuideID={guideID} />
        <Button onClick={onSave} className="text-xs h-9 px-3" disabled={saveButtonDisabled}>
          <Save className="h-3 w-3 mr-2" />
          Save Guide
        </Button>
      </div>
    </header>
  )
}

