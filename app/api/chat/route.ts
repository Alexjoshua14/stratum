import sparkToolSet from "@/lib/ai/tools/toolSet";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// TODO: save all messages including AI message to the database
export async function POST(req: Request) {
  const { messages, id } = await req.json();
  console.log("MESSAGE RECIEVED");

  const res = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: { ...sparkToolSet },
    maxSteps: 5,
  });

  return res.toDataStreamResponse();
}
