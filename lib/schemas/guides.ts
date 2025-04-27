/**
 * @description This file contains the Zod schemas for validating the data used in the guides API.
 * @author Alex Joshua
 * @date 2025-3-31
 */

import { z } from "zod";
import { Section } from "../types";

export const supabaseGuideSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(100),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  overview_md: z.string().optional(),
  architecture_md: z.string().optional(),
  notes_md: z.string().optional(),
  parent_id: z.string().uuid().optional(),
  user_id: z.string().optional(),
  visibility: z.enum(["public", "private"]).default("private").optional(),
});
export type SupabaseGuide = z.infer<typeof supabaseGuideSchema>;

export const guideSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  content: z.string().min(1),
  author_id: z.string().uuid().optional(),
  parent_guide_id: z.string().uuid().optional(),
  is_published: z.boolean().default(false),
  is_draft: z.boolean().default(true),
});

// TODO: Clean this up so that it is not a duplicate of the one in the types file
export const SectionSchema = z.enum([
  Section.Overview,
  Section.Architecture,
  Section.Steps,
  Section.Notes,
]);

export const suggestionData = z.object({
  section: SectionSchema,
  content: z.string().min(1),
});

export type SuggestionData = z.infer<typeof suggestionData>;
