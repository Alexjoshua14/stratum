/**
 * This tool can be invoked by an AI agent to toggle the markdwon editor
 * from preview mode to edit mode. And then place the cursor at the
 * end of the document or even possibly at the end of the selected text/step.
 */

import { RefObject } from "react";

/**
 * Interface representing the methods exposed by your Markdown editor.
 */
export interface MarkdownEditorRef {
  /**
   * Switches the editor to edit mode.
   * This method should be idempotent.
   */
  toggleToEdit: () => number;
  /**
   * Focuses the editor input so that the user can start typing.
   */
  focusEditor: () => boolean;
}

// export default function editMarkdownEditor(
//   editor: React.MutableRefObject<any>,
//   setEditorContent: React.Dispatch<React.SetStateAction<string>>,
//   content: string,
// ) {
//   editor.current?.commands.setContent(content)
//   editor.current?.commands.focusAtEnd()
//   setEditorContent(content)
// }

// Does it need to bne a hook?
export const toggleMarkdownEditor = (
  editorRef: RefObject<MarkdownEditorRef | null>
): number => {
  if (editorRef.current) {
    // Toggle to edit mode if not already active.
    editorRef.current.toggleToEdit();
    // Focus the editor.
    editorRef.current.focusEditor();
  } else {
    console.warn("Markdown editor reference is not avaiable.");
    return 404; // Not found
  }

  return 200; // OK
};
