import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { guideSchema } from "@/lib/schemas/guides";

export const maxDuration = 30;

export async function generateGuide(prompt: string) {
  const guide = await generateObject({
    model: openai("gpt-4o"),
    prompt: `Generate a comprehensive, step-by-step tech guide written in the style of a Medium blog post. 
    The guide should help programmers build a project that improves their coding skills, outlines their ideal project, 
    and enhances their tech portfolio. Include a captivating title, an engaging introduction, 
    detailed actionable sections with technical instructions, a concise conclusion summarizing 
    key takeaways, and suggestions for additional resources. Project to build: ${prompt}
  `,
    schema: guideSchema,
  });
}
