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

const creationUIToolSet = {
  switchActiveSection: switchActiveSection,
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
