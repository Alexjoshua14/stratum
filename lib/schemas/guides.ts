/**
 * @description This file contains the Zod schemas for validating the data used in the guides API.
 * @author Alex Joshua
 * @date 2025-3-31
 */

import { z } from "zod";

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
