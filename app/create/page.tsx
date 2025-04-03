"use client"

import { useRef, useState } from "react"
import { Send, FileText, Box, ListOrdered, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { MarkdownPreview } from "@/components/markdown/markdown-preview"
import { GuideHeader } from "@/components/guide-header"
import { useRouter } from "next/navigation"
import { toggleMarkdownEditor } from "@/lib/ai/tools/editMarkdown"

enum Section {
  Overview = "Overview",
  Architecture = "Architecture",
  Steps = "Steps",
  Notes = "Notes",
}

// TODO: Update layout so content on this page in desktop mode takes
// up exactly the window height, no scrollbar, no gap between footer
export default function GuideCreationPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(Section.Overview)
  const [editorContent, setEditorContent] = useState({
    Overview: "# Overview\n\nStart writing your guide overview here...",
    Architecture: "# Architecture\n\nDescribe your software architecture here...",
    Steps: "# Steps\n\n1. First step\n2. Second step\n3. Third step",
    Notes: "# Notes\n\nAdd any additional notes or references here...",
  })
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. Ask me anything about your guide, and I'll help you create better content.",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [guideTitle, setGuideTitle] = useState("New Software Guide")

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
  }

  const handleEditorChange = (content: string) => {
    setEditorContent({
      ...editorContent,
      [activeSection]: content,
    })
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessages = [
      ...messages,
      { role: "user", content: inputMessage },
      {
        role: "assistant",
        content: `Here's a suggestion for your ${activeSection} section:

\`\`\`
${activeSection === "Overview"
            ? "This guide covers the implementation of a modern web application using React and Next.js."
            : activeSection === "Architecture"
              ? "The application follows a client-server architecture with a Next.js frontend and a RESTful API backend."
              : activeSection === "Steps"
                ? "1. Set up your development environment\n2. Initialize your Next.js project\n3. Implement the core features"
                : "Remember to include references to any external libraries or resources used in this guide."
          }
\`\`\`

Click on this suggestion to add it to your editor.`,
      },
    ]

    setMessages(newMessages)
    setInputMessage("")
    // TODO: TEMPORARY
    handleMCPCommand({ name: "changeSection", section: Section.Architecture })
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

  const handleSave = () => {
    // In a real app, this would save the guide to a database
    console.log("Saving guide:", {
      title: guideTitle,
      content: editorContent,
    })
    // Show a success message or redirect
  }

  const handleBack = () => {
    // In a real app, this would navigate back to the guides list
    router.push("/")
  }

  const editorRef = useRef(null)

  const handleMCPCommand = (command: { name: string, section?: Section }) => {
    switch (command.name) {
      case 'save':
        handleSave();
        break;
      case 'back':
        handleBack();
        break;
      case 'toggleMarkdownEditor':
        toggleMarkdownEditor(editorRef);
        break;
      case 'changeSection':
        if (!command.section) {
          console.warn("Section not specified");
          return;
        }
        handleSectionChange(command.section);
        break;
      default:
        console.warn(`Unknown command: ${command.name}`);
        break;
    }
  }

  return (
    <div className="flex flex-col md:h-[80dvh] w-full bg-background">
      <GuideHeader title={guideTitle} onSave={handleSave} onBack={handleBack} />

      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
        {/* Left Panel */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full min-w-min flex flex-col border-r border-border">
          <SidebarProvider className="min-h-80 h-full">
            <Sidebar
              variant="floating"
              collapsible="icon"
              className="w-48 h-full pt-12"
            >
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "Overview"}
                          onClick={() => handleSectionChange(Section.Overview)}
                          tooltip="Overview"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          <span>Overview</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "Architecture"}
                          onClick={() => handleSectionChange(Section.Architecture)}
                          tooltip="Architecture"
                        >
                          <Box className="h-4 w-4 mr-2" />
                          <span>Architecture</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "Steps"}
                          onClick={() => handleSectionChange(Section.Steps)}
                          tooltip="Steps"
                        >
                          <ListOrdered className="h-4 w-4 mr-2" />
                          <span>Steps</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activeSection === "Notes"}
                          onClick={() => handleSectionChange(Section.Notes)}
                          tooltip="Notes"
                        >
                          <StickyNote className="h-4 w-4 mr-2" />
                          <span>Notes</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <div className="w-full h-full flex flex-col">
              <div className="flex items-center p-2 border-b border-border">
                <SidebarTrigger className="mr-2" />
                <h2 className="text-lg font-medium">{activeSection}</h2>
              </div>
              <div className="p-4 flex-grow overflow-hidden">
                <MarkdownPreview content={editorContent[activeSection]} onChange={handleEditorChange} />
              </div>
            </div>
          </SidebarProvider>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-muted/30">
          <div className="p-4 bg-background border-b border-border">
            <h2 className="text-lg font-semibold">Ask AI about this section</h2>
            <p className="text-sm text-muted-foreground">
              Get suggestions and improvements for your {activeSection.toLowerCase()} section
            </p>
          </div>

          <div className="flex-grow overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <Card
                key={index}
                className={`p-4 max-w-[80%] ${message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-card hover:bg-accent/50 cursor-pointer"
                  }`}
                onClick={() => message.role === "assistant" && insertSuggestion(message.content)}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </Card>
            ))}
          </div>

          <div className="p-4 border-t border-border bg-background">
            <div className="flex items-center space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask AI for help with this section..."
                className="flex-grow"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

