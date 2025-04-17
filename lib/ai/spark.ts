"use server";

/**
 * Spark calls Vercel's AI Core sdk and uses the
 * coreResponse object to get it's well defined response back
 */

import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import sparkToolSet from "./tools/toolSet";

export const spark = async (messages: CoreMessage[]) => {
  const response = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: { ...sparkToolSet },
    maxSteps: 5,
  });
  console.log("Spark response: ", response);

  // Should handleMCP get placed here?
  // If it did, would maybe need to pass spark refs

  return response;
};
