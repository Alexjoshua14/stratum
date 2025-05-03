import { coreSystemPrompt } from "@/lib/ai/resources/corePrompt";
import sparkToolSet from "@/lib/ai/tools/toolSet";
import { getRecentChatMessages, saveChatMessage } from "@/lib/supabase/chat";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import {
  appendClientMessage,
  appendResponseMessages,
  Message,
  streamText,
  UIMessage,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SLIDING_WINDOW_SIZE = 10;

// TODO: save all messages including AI message to the database
export async function POST(req: Request) {
  // Temporary auth check
  // If user is not signed in don't allow messages
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const { message, id } = await req.json();
  console.log("MESSAGE RECIEVED");
  const user = await currentUser();

  // TODO: REMOVE THIS CHECK, TEMPORARY secondarry check to ensure for auth
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const latestMessages = await getRecentChatMessages(id, SLIDING_WINDOW_SIZE);
  console.log("Latest messages: ", latestMessages);

  await saveChatMessage({
    guide_id: id,
    message: message,
    role: "user",
  });

  let messages: Message[];

  if (latestMessages == null) {
    messages = [message];
  } else {
    messages = appendClientMessage({
      messages: latestMessages ?? [],
      message: message,
    });
  }

  const res = streamText({
    model: openai("gpt-4.1-mini"),
    messages,
    system: coreSystemPrompt,
    tools: { ...sparkToolSet },
    maxSteps: 15,
    async onFinish({ response }) {
      console.log("AI response: ", response);
      console.log("Guide id: ", id);
      // TODO: Refactor this to avoid unncessary code to conver ResponseMessage to Message
      const tempMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      await saveChatMessage({
        guide_id: id,
        message: tempMessages[tempMessages.length - 1],
        role: "assistant",
      });
    },
  });

  return res.toDataStreamResponse({
    sendReasoning: true,
  });
}
