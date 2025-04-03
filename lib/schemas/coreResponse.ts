/**
 * This schema defines the core response we should expect from the AI during creation
 * of a guide. It includes the title, sections, and any additional information
 * that might be relevant to the guide or with the creation tool's UI (universal interface).
 */

import { z } from "zod";
import type { AssistantMessage } from "ai";
// Note could eventually make this a true core ai and have a optional parameters
// to specify where else to go
// We would also have a breakout function that acts as the gateway for the ai
// to move the user out of this guide and to another page or guide
// We would want the breakout gateway to bring up a user prompt (which could be disabled by the
// user after the first time) to ask to confirm that the ai agent can bring them to the other section/page

// Get core ai sdk message type and make it a zod schema

export const coreResponseSchema = z.object({
  // Same schema as general AI message so we can treat it the same if desired.
  // Just with more knobs defined
  id: z.string(),
  model: z.string(),
  timestamp: z.date(),
  headers: z.record(z.string()),
  body: z.unknown(),
  text: z.string().describe("Response for the user"),
  sectionTitle: z
    .string()
    .optional()
    .describe("Title of the section to change to"),
  pageRedirect: z
    .string()
    .optional()
    .describe("Name of the page to send the user to"),
  // TBD
});
