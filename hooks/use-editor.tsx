import { Section } from "@/lib/types";
import { useState } from "react";
import { SuggestionData } from "@/lib/schemas/guides";


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

  /**
   * 
   * @param suggestion - Expected to be in a specific format
   * 
   */
  const insertSuggestion = (suggestion: SuggestionData) => {
    const { section, content } = suggestion

    if (section && content) {
      setEditorContent({
        ...editorContent,
        [section]: content.trim(),
      })
    }
  }

  return { editorContent, handleEditorChange, activeSection, handleSectionChange, insertSuggestion }

}