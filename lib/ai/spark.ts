"use server";

/**
 * Spark calls Vercel's AI Core sdk and uses the
 * coreResponse object to get it's well defined response back
 */

import { openai } from "@ai-sdk/openai";
import { coreResponseSchema } from "../schemas/coreResponse";
import {
  CoreMessage,
  generateObject,
  generateText,
  streamText,
  UIMessage,
} from "ai";

export const spark = async (messages: CoreMessage[]) => {
  const response = await streamText({
    model: openai("gpt-4o"),
    messages,
  });

  // Should handleMCP get placed here?
  // If it did, would maybe need to pass spark refs

  return response;
};
