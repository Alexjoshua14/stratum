import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const ArchitectureStructure = z.object({
  techStack: z.string(),
  architecture: z.string(),
});

const generateArchitecture = tool({
  description: "Calls another AI agent with the conversation's history",
  parameters: z.object({
    toolCallId: z.number(),
    techStack: z.string(),
  }),
  execute: async (args, { messages }) => {
    generateObject({
      model: openai("gpt-4o"),
      messages,
      schema: ArchitectureStructure,
    });
  },
});
