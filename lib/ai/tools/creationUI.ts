import { Section } from "@/lib/types";
import { tool } from "ai";
import { z } from "zod";

// Client-side tool to switch the active section of the guide
const switchActiveSection = tool({
  description: "Switch the active section of the guide",
  parameters: z.object({
    section: z.enum(["Overview", "Architecture", "Steps", "Notes"]),
  }),
});

const appendToSection = tool({
  description: "Append markdown to the active section",
  parameters: z.object({
    section: z
      .enum(["Overview", "Architecture", "Steps", "Notes"])
      .describe("Section to append to"),
    content: z.string().describe("Markdown content to append"),
  }),
});

const getActiveSection = tool({
  description: "Get the active section of the guide",
  parameters: z.object({}),
});

const creationUIToolSet = {
  switchActiveSection: switchActiveSection,
  appendToSection: appendToSection,
  getActiveSection: getActiveSection,
};

export default creationUIToolSet;

// return {
//   message: {
//     role: "tool",
//     content: `Swtiching to ${section} tabl`,
//     name: "switchActiveSection",
//     data: { section },
//   },
// };
