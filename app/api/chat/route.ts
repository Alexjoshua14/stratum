import { coreSystemPrompt } from "@/lib/ai/resources/corePrompt";
import sparkToolSet from "@/lib/ai/tools/toolSet";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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

  const { messages, id } = await req.json();
  console.log("MESSAGE RECIEVED");
  const user = await currentUser();

  // TODO: REMOVE THIS CHECK, TEMPORARY secondarry check to ensure for auth
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const res = streamText({
    model: openai("gpt-4.1-mini"),
    messages,
    // prompt: messages[0].content,
    system: coreSystemPrompt,
    tools: { ...sparkToolSet },
    maxSteps: 15,
    // onFinish: (message) => {
    //   console.log("AI message: ", message);
    // },
  });

  return res.toDataStreamResponse({
    sendReasoning: true,
  });
}
