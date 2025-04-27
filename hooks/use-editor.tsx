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
   * Insert suggestion into the specified section of the editor.
   * Inserts the suggestion at the end of the section by default.
   * If insertAt is provided, it will insert at that index.
   * 
   * @param suggestion - Expected to be in a specific format
   * @param insertAt - Optional index to insert the suggestion at
   * 
   */
  const insertSuggestion = (suggestion: SuggestionData, insertAt?: number) => {
    const { section, content } = suggestion

    if (section && content) {
      // Append the content to the active section
      setEditorContent((prevContent) => {
        const currentContent = prevContent[section] || ""
        const newContent = insertAt !== undefined
          ? currentContent.slice(0, insertAt) + content + currentContent.slice(insertAt)
          : currentContent + "\n" + content

        return {
          ...prevContent,
          [section]: newContent,
        }
      })
    }
  }

  const removeContent = ({ section, start, end }: { section: Section, start: number, end: number }) => {
    setEditorContent((prevContent) => {
      const currentContent = prevContent[section] || ""
      const newContent = currentContent.slice(0, start) + currentContent.slice(end)

      return {
        ...prevContent,
        [section]: newContent,
      }
    }
    )
  }

  const handleGuideChange = (content: typeof editorContent) => {
    setEditorContent(content)
  }

  return { editorContent, handleEditorChange, activeSection, handleSectionChange, insertSuggestion, removeContent, handleGuideChange }

}