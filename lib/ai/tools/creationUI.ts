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

const saveGuide = tool({
  description: "Save the guide",
  parameters: z.object({
    title: z.string().describe("Title of the guide if no title is set"),
  }),
});

const getGuideTitle = tool({
  description: "Get the title of the guide",
  parameters: z.object({}),
});

const setGuideTitle = tool({
  description: "Set the title of the guide",
  parameters: z.object({
    title: z
      .string()
      .describe(
        "Title of the guide, should ideally be less than 30 characters"
      ),
  }),
});

const getGuideContent = tool({
  description: "Get the content of the guide",
  parameters: z.object({
    section: z
      .enum(["Overview", "Architecture", "Steps", "Notes"])
      .describe("Section to get content from"),
  }),
});

const getMarkdownEditorState = tool({
  description: "Get whether markdown editor is in edit mode or preview mode",
  parameters: z.object({}),
});

const toggleMarkdownEditor = tool({
  description: "Toggle the markdown editor",
  parameters: z.object({}),
});

const creationUIToolSet = {
  switchActiveSection: switchActiveSection,
  appendToSection: appendToSection,
  getActiveSection: getActiveSection,
  saveGuide: saveGuide,
  getGuideTitle: getGuideTitle,
  setGuideTitle: setGuideTitle,
  // getGuideContent: getGuideContent,
  getMarkdownEditorState: getMarkdownEditorState,
  toggleMarkdownEditor: toggleMarkdownEditor,
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
