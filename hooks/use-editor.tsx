import { Section } from "@/lib/types";
import { useState } from "react";


export function useEditor() {
  const [text, setText] = useState("")

  const [activeSection, setActiveSection] = useState(Section.Overview)
  const [editorContent, setEditorContent] = useState({
    Overview: "# Overview\n\nStart writing your guide overview here...",
    Architecture: "# Architecture\n\nDescribe your software architecture here...",
    Steps: "# Steps\n\n1. First step\n2. Second step\n3. Third step",
    Notes: "# Notes\n\nAdd any additional notes or references here...",
  })


  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
  }

  const handleEditorChange = (content: string) => {
    setEditorContent({
      ...editorContent,
      [activeSection]: content,
    })
  }

  const insertSuggestion = (suggestion: string) => {
    const codeBlockRegex = /```([\s\S]*?)```/
    const match = suggestion.match(codeBlockRegex)

    if (match && match[1]) {
      const newContent = editorContent[activeSection] + "\n\n" + match[1].trim()
      setEditorContent({
        ...editorContent,
        [activeSection]: newContent,
      })
    }
  }

  return { editorContent, handleEditorChange, activeSection, handleSectionChange, insertSuggestion }

}