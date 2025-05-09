import { UIMessage } from 'ai'
import { FC } from 'react'
import { Card } from '../ui/card'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

interface ChatMessageProps {
  message: UIMessage
  handleSuggestion: (message: UIMessage) => void
}


const ChatMessage: FC<ChatMessageProps> = ({ message, handleSuggestion }) => {
  return (
    <Card
      key={message.id}
      className={`p-4 max-w-[80%] overflow-hidden ${message.role === "user"
        ? "ml-auto bg-primary text-primary-foreground"
        : "mr-auto bg-card hover:bg-accent/50 cursor-pointer"
        }`}
      onClick={() => message.role === "assistant" && handleSuggestion(message)}
    >
      {
        message.parts?.map((part, index) => {
          switch (part.type) {
            case 'text': {
              return (
                <Markdown
                  key={index}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {part.text}
                </Markdown>
              )
            }


            case 'reasoning':
              return (
                <pre key={index}>
                  {
                    part.details.map(detail =>
                      detail.type === 'text' ? detail.text : '<redacted>'
                    )
                  }
                </pre>
              )

            case 'tool-invocation': {
              const callId = part.toolInvocation.toolCallId
              console.log("Tool invocation caught: ", part.toolInvocation)
              
              switch (part.toolInvocation.toolName) {
                case 'switchActiveSection': {
                  switch (part.toolInvocation.state) {
                    case 'call':
                      return <div key={callId}>Switching active section..</div>
                    case 'result':
                      <div key={callId}>
                        Switched to {part.toolInvocation.args.section}!
                      </div>
                  }

                }

                case 'appendToSection': {
                  switch (part.toolInvocation.state) {
                    case 'call':
                      return <div key={callId}>Appending content to {part.toolInvocation.args.section}..</div>
                    case 'result':
                      <div key={callId}>
                        Switched to {part.toolInvocation.args.section}!
                      </div>
                  }

                }

              }
            }
          }
        })
      }
    </Card>
  )
}

export default ChatMessage
