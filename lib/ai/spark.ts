/**
 * Spark calls Vercel's AI Core sdk and uses the
 * coreResponse object to get it's well defined response back
 */

import { openai } from "@ai-sdk/openai";
import { coreResponseSchema } from "../schemas/coreResponse";
import { generateObject } from "ai";

export const spark = async (prompt: string) => {
  const response = await generateObject({
    model: openai("gpt-4o"),
    prompt,
    schema: coreResponseSchema,
  });

  // Should handleMCP get placed here?
  // If it did, would maybe need to pass spark refs

  return response;
};
