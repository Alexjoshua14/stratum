"use client"

import { MouseEventHandler, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"

interface MarkdownPreviewProps {
  content: string
  onChange: (content: string) => void
}

export function MarkdownPreview({ content, onChange }: MarkdownPreviewProps) {
  const [isPreview, setIsPreview] = useState(true)

  const togglePreview = () => {
    if (!isPreview) {
      onChange(content)
    }
    setIsPreview(!isPreview)
  }

  // Simple markdown rendering (this could be enhanced with a proper markdown library)
  const renderMarkdown = (text: string) => {
    // Handle headings
    let html = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')

    // Handle lists
    html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')
    html = html.replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')

    // Handle bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Handle code blocks
    html = html.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-muted p-4 rounded-md my-2 overflow-auto"><code>$1</code></pre>',
    )
    html = html.replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded">$1</code>')

    // Handle paragraphs
    html = html.replace(/^(?!<[hl]|<li|<pre)(.+)/gm, '<p class="my-2">$1</p>')

    return html
  }

  // Enables the user to toggle render mode via
  // a center number of simultaneous clicks
  const handleQuickToggle = (e) => {
    if (e.detail === 2) {
      e.preventDefault()
      togglePreview()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-2">
        <Button variant="outline" size="sm" onClick={togglePreview}>
          {isPreview ? <Edit className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
          <span className="hidden sm:inline">{isPreview ? "Edit" : "Preview"}</span>
        </Button>
      </div>

      {isPreview ? (
        <div
          className="flex-grow p-4 bg-background border border-input rounded-md overflow-auto"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          onClick={handleQuickToggle}
        />
      ) : (
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow p-4 bg-background border border-input rounded-md resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={handleQuickToggle}
        />
      )}
    </div>
  )
}

