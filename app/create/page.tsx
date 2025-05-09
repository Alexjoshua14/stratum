"use client"

import { useEffect, useRef, useState } from "react"
import { Send, FileText, Box, ListOrdered, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { useChat } from "@ai-sdk/react"
import { Section } from "@/lib/types"
import { useEditor } from "@/hooks/use-editor"
import { UIMessage } from "ai"
import { guideSchema, SectionSchema, SuggestionData, SupabaseGuide } from "@/lib/schemas/guides"
import ChatMessage from "@/components/chat/chat-message"
import { getGuideById, upsertGuide } from "@/lib/supabase/guides"
import { getChatMessagesById } from "@/lib/supabase/chat"

// TODO: Update layout so content on this page in desktop mode takes
// up exactly the window height, no scrollbar, no gap between footer
// TODO: Refactor this page to a SSR page so that we can grab id using dynamic route
// and move most of logic into child client side components
export default function GuideCreationPage() {
  const router = useRouter()

  /** TEMPORARY ***/
  const [messageCount, setMessageCount] = useState(0)
  const MESSAGE_RATE_PER_SESSION = 20
  useEffect(() => {
    switch (messageCount) {
      case MESSAGE_RATE_PER_SESSION - 1:
        console.log("No Messages Left")
        break
      case MESSAGE_RATE_PER_SESSION - 2:
        console.log("1 Message Left")
        break
      case MESSAGE_RATE_PER_SESSION - 3:
        console.log("2 Messages Left")
        break
      default:
    }
  }, [messageCount])


  /**
   * Constants
   */
  // Pixel threshold to determine if the user is at the bottom of the chat
  const scrollThreshold = 100

  /**
   * Ref objects
   */
  const editorRef = useRef(null)
  const bottomSentinelRef = useRef<HTMLDivElement>(null)
  const chatMessageContainerRef = useRef<HTMLDivElement>(null)
  // TODO: Need to forward this ref to the button in the header
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  /**
   * State variables
   */
  const [guideTitle, setGuideTitle] = useState("")
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [streamingResponse, setStreamingResponse] = useState(false)
  const [guideID, setguideID] = useState<string>(crypto.randomUUID())
  const [savingGuide, setSavingGuide] = useState<boolean>(false)

  /**
   * Custom hooks
   */
  const { editorContent, handleEditorChange, activeSection, handleSectionChange, insertSuggestion, removeContent, handleGuideChange } = useEditor()

  const { messages, setMessages, input, handleInputChange, handleSubmit, error, reload } = useChat({
    id: guideID,
    initialMessages: [],
    sendExtraMessageFields: true,
    maxSteps: 15,
    async onToolCall({ toolCall }) {
      // TODO: Move this logic into the separate function below
      // handleToolCall(toolCall)
      switch (toolCall.toolName) {
        case 'switchActiveSection':
          return switchActiveSection(toolCall.args as { section: Section })
        case 'insertContent':
          return insertContent(toolCall.args as { section: Section, content: string, insertAt?: number })
        case 'removeContent':
          return removeContent(toolCall.args as { section: Section, start: number, end: number })
        case 'getActiveSection':
          return `The current active section is ${activeSection}`
        case 'saveGuide':
          return saveGuide(toolCall.args as { title: string | undefined })
        case 'getGuideTitle':
          return guideTitle
        case 'getGuideContent':
          return getGuideContent(toolCall.args as { section: Section })
        case 'setGuideTitle':
          return aiSetTitle(toolCall.args as { title: string })
        case 'getMarkdownEditorState': // TODO: IMPLMEMENT THIS, will need forwardRef
          return "Unknown, this has yet to be implemented.."
        case 'toggleMarkdownEditor':
          toggleMarkdownEditor(editorRef)
          return "Toggled markdown editor"
        default:
          console.error("Unknown tool:", toolCall.toolName)
          return "Unknown tool"
      }
    },
    onFinish: (message, { usage }) => {
      setMessageCount(prev => prev + 1)
      console.log("Message statistics: ", usage)
      setStreamingResponse(false)
    },
    onError: (error) => {
      console.error("Error in chat: ", error)
      setStreamingResponse(false)
    },
    experimental_prepareRequestBody({ messages, id }) {
      return { message: messages[messages.length - 1], id }
    }
  })

  /**
   * Effect hooks
   */
  useEffect(() => {
    const container = chatMessageContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    if (isAtBottom) {
      bottomSentinelRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAtBottom])

  useEffect(() => {
    async function getMessages() {
      const dbMessages = await getChatMessagesById(guideID)
      if (dbMessages) {
        setMessages(dbMessages)
      }
    }

    getMessages()
  }, [guideID])


  /**
   * Handlers
   */
  const handleScroll = () => {
    if (chatMessageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessageContainerRef.current
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
      setIsAtBottom(distanceFromBottom < scrollThreshold)
    }
  }

  const handleTitleSave = (newTitle: string) => {
    setGuideTitle(newTitle)
  }

  async function handleSave() {
    if (savingGuide) {
      console.warn("Handle save function call detected while savingGuide is already set to true..")
      return
    }

    setSavingGuide(true)
    try {

      if (guideTitle.trim() == "") {
        console.log("No guide title set..")
        return
      }

      console.log("Saving guide..")

      const guide: SupabaseGuide = {
        id: guideID ?? undefined,
        title: guideTitle,
        overview_md: editorContent[Section.Overview],
        architecture_md: editorContent[Section.Architecture],
        notes_md: editorContent[Section.Notes],
      }

      const res = await upsertGuide(guide)
      if (res === null) {
        console.log("Null returned from upsertGuide call")
      } else {
        setguideID(res.id)
      }

      console.log("Upserted guide?..")
    } catch (err) {
      console.error("Error encountered while saving guide", err)
    } finally {
      setSavingGuide(false)
    }
  }

  async function updateSelectedGuide(id: string) {
    const guide = await getGuideById(id)

    if (guide == null) {
      console.error("No guide found for provided ID..")
      return false
    }

    handleGuideChange({
      Overview: guide?.overview_md ?? "",
      Architecture: guide?.architecture_md ?? "",
      Steps: "",
      Notes: guide?.notes_md ?? ""
    })

    setGuideTitle(guide?.title ?? "")
    setguideID(id)
    return true
  }

  // const handleSave = () => {
  //   // In a real app, this would save the guide to a database
  //   if (guideTitle.trim() === "") {
  //     console.log("No guide title set..")
  //     return
  //   }
  //   console.log("Saving guide:", {
  //     title: guideTitle,
  //     content: editorContent,
  //   })

  //   const guide: SupabaseGuide = {
  //     id: guideID ?? undefined,
  //     title: guideTitle,
  //     overview_md: editorContent[Section.Overview],
  //     architecture_md: editorContent[Section.Architecture],
  //     notes_md: editorContent[Section.Notes],
  //   }

  //   createOrUpdateGuide(guide)
  //   // Show a success message or redirect
  // }

  const handleBack = () => {
    // In a real app, this would navigate back to the guides list
    if (window.confirm("Are you sure you want to leave without saving?"))
      router.push("/")
  }

  const handleSubmitWrapper: typeof handleSubmit = (...props) => {
    setIsAtBottom(true)
    setStreamingResponse(true)

    // TODO: REMOVE TEMPORARY DAM
    if (messageCount >= 0 && messageCount < MESSAGE_RATE_PER_SESSION) {
      handleSubmit(...props)
    } else {
      console.log("HIT TEMPORARY MESSAGE RATE LIMIT")
    }
  }



  const handleSuggestion = (message: UIMessage) => {
    const section = activeSection
    const content = message.content

    const codeBlockRegex = /```([\s\S]*?)```/
    const match = content.match(codeBlockRegex)

    if (match) {
      const suggestionData: SuggestionData = {
        section: section,
        content: match[1].trim(),
      }

      insertSuggestion(suggestionData)
    }
  }

  /**
   * AI Client side tools
   */

  const switchActiveSection = (args: { section: Section }) => {
    try {
      const section = SectionSchema.parse(args.section)

      // Call the function to switch the active section
      handleSectionChange(section)

      console.debug("Switching active section to:", section)
      return `Changed active section to ${section}`
    }

    catch (error) {
      console.error("Error switching section: ", error)
      return `Error switching section: ${error}`
    }
  }

  const insertContent = (args: { section: Section, content: string, insertAt?: number }) => {
    console.log("Adding to section:", args.section)
    console.log("Content to add:", args.content.slice(0, 25))
    try {
      // Ensure the section is valid
      const section = SectionSchema.parse(args.section)
      // Ensure the content is valid
      if (!args.content || args.content.trim() === "") {
        throw new Error("Content is empty or invalid")
      }
      // Sanitize content to avoid XSS attacks while still allowing markdown
      const sanitizedContent = args.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")

      const content = sanitizedContent

      // Call the function to append to the active section
      insertSuggestion({ section, content }, args.insertAt)

      console.debug("Adding to section: ", section)
      return `Added to ${section} section`
    } catch (error) {
      console.error("Error appending to section: ", error)
      return `Error appending to section: ${error}`
    }
  }


  const saveGuide = (args: { title: string | undefined }) => {
    console.log("Saving guide with title:", args.title)
    if (guideTitle.trim() === "") {
      if (args.title) {
        setGuideTitle(args.title)
      } else {
        console.error("No title provided and no title set")
        return "No title provided and no title set"
      }
    }

    // Handle saving the guide here
    console.log("Pretending to save the guide..")
    handleSave()

    return `Guide saved with title: ${guideTitle}`
  }

  const aiSetTitle = (args: { title: string }) => {
    try {
      const title = args.title
      setGuideTitle(title)
      console.debug("Setting guide title to:", title)
      return `Guide title set to: ${title}`
    } catch (error) {
      console.error("Error setting guide title: ", error)
      return `Error setting guide title: ${error}`
    }
  }

  const getGuideContent = (args: { section: Section }) => {
    try {
      const section = SectionSchema.parse(args.section)
      const content = editorContent[section]
      console.debug("Getting guide content for section:", section)
      return content
    } catch (error) {
      console.error("Error getting guide content: ", error)
      return `Error getting guide content: ${error}`
    }
  }

  // TODO: Refactor this to take in toolCall and handle it as done above to move logic around
  // const handleToolCall = (toolCall: ToolCall<string, unknown>) => {
  //   switch (toolCall.toolName) {
  //     case 'switchActiveSection':
  //       return switchActiveSection(toolCall.args as { section: Section })
  //     case 'appendToSection':
  //       return appendToSection(toolCall.args as { section: Section, content: string })
  //     case 'getActiveSection':
  //       return `The current active section is ${activeSection}`
  //     case 'saveGuide':
  //       return saveGuide(toolCall.args as { title: string | undefined })
  //     case 'getGuideTitle':
  //       return guideTitle
  //     case 'getGuideContent':
  //       return getGuideContent(toolCall.args as { section: Section })
  //     case 'setGuideTitle':
  //       return aiSetTitle(toolCall.args as { title: string })
  //     case 'getMarkdownEditorState': // TODO: IMPLMEMENT THIS, will need forwardRef
  //       return "Unknown, this has yet to be implemented.."
  //     case 'toggleMarkdownEditor':
  //       toggleMarkdownEditor(editorRef)
  //       return "Toggled markdown editor"
  //     default:
  //       console.error("Unknown tool:", toolCall.toolName)
  //       return "Unknown tool"
  //   }
  // }

  return (
    <div className="flex flex-col md:h-[80dvh] w-full bg-background">
      <GuideHeader
        title={guideTitle}
        updateTitle={setGuideTitle}
        guideID={guideID}
        onSave={handleSave}
        onBack={handleBack}
        onTitleSave={handleTitleSave}
        saveButtonDisabled={savingGuide}
        updateSelectedGuide={updateSelectedGuide}
      />

      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
        {/* Left Panel */}
        <div className="relative md:w-1/2 h-[50svh] md:h-full min-w-min flex flex-col border-r border-border">
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
        <div className="md:w-1/2 h-[50svh] md:h-full flex flex-col bg-muted/30">
          <div className="p-4 bg-background border-b border-border">
            <h2 className="text-lg font-semibold">Ask AI about this section</h2>
            <p className="text-sm text-muted-foreground">
              Get suggestions and improvements for your {activeSection.toLowerCase()} section
            </p>
          </div>

          <div
            className="flex-grow overflow-auto p-4 space-y-4"
            ref={chatMessageContainerRef}
          >
            {messages.map(message => (
              <ChatMessage message={message} key={message.id} handleSuggestion={handleSuggestion} />
            ))}
            {
              error && (
                <>
                  <div>An error occurred.</div>
                  <Button onClick={() => reload()}>
                    Retry
                  </Button>
                </>
              )
            }
            <div ref={bottomSentinelRef} />
          </div>

          <div className="p-4 border-t border-border bg-background">
            <form className="flex items-center space-x-2" onSubmit={handleSubmitWrapper}>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask AI for help with this section..."
                className="flex-grow"
                onKeyDown={(e) => e.key === "Enter" && !streamingResponse && handleSubmitWrapper}
              />
              <Button size="icon" onClick={handleSubmitWrapper} disabled={streamingResponse} className="transition-all duration-300">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

