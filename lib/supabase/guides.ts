/**
 * @description This file contains supabase functions for interacting with guides table
 * @author Alex Joshua
 * @date 2025-3-31
 */

import { guideSchema } from "@/lib/schemas/guides";
import { z } from "zod";
import supabase from "@/lib/supabaseClient";

export async function getGuides() {
  const db = supabase;

  try {
    const guides = await db
      .from("guides")
      .select("*")
      .order("created_at", { ascending: false });

    if (guides.error) {
      console.error("Error fetching guides:", guides.error);
      return null;
    }

    if (guides.data == null) {
      return null;
    }

    const parsedGuides = guides.data
      .map((g) => {
        if (g == null) return null;

        return guideSchema.parse(g);
      })
      .filter((g) => g != null);
    return parsedGuides;
  } catch (error) {
    console.error("Error fetching guides:", error);
    return null;
  }
}

export async function createGuide(guide: z.infer<typeof guideSchema>) {
  const db = supabase;

  try {
    const { data, error } = await db
      .from("guides")
      .insert([guide])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating guide:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    return guideSchema.parse(data);
  } catch (error) {
    console.error("Error creating guide:", error);
    return null;
  }
}

export async function updateGuide(guide: z.infer<typeof guideSchema>) {
  const db = supabase;

  try {
    const { data, error } = await db
      .from("guides")
      .update(guide)
      .eq("id", guide.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating guide:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    return guideSchema.parse(data);
  } catch (error) {
    console.error("Error updating guide:", error);
    return null;
  }
}
export async function deleteGuide(guideId: string) {
  const db = supabase;

  try {
    const { data, error } = await db
      .from("guides")
      .delete()
      .eq("id", guideId)
      .select("*")
      .single();

    if (error) {
      console.error("Error deleting guide:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    return guideSchema.parse(data);
  } catch (error) {
    console.error("Error deleting guide:", error);
    return null;
  }
}

export async function getGuideById(guideId: string) {
  const db = supabase;

  try {
    const { data, error } = await db
      .from("guides")
      .select("*")
      .eq("id", guideId)
      .single();

    if (error) {
      console.error("Error fetching guide:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    return guideSchema.parse(data);
  } catch (error) {
    console.error("Error fetching guide:", error);
    return null;
  }
}

export async function getGuidesByAuthorId(authorId: string) {
  const db = supabase;

  try {
    const { data, error } = await db
      .from("guides")
      .select("*")
      .eq("author_id", authorId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guides:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    const parsedGuides = data
      .map((g) => {
        if (g == null) return null;

        return guideSchema.parse(g);
      })
      .filter((g) => g != null);
    return parsedGuides;
  } catch (error) {
    console.error("Error fetching guides:", error);
    return null;
  }
}

export async function getGuidesByParentId(parentId: string) {
  const db = supabase;

  try {
    const { data, error } = await db
      .from("guides")
      .select("*")
      .eq("parent_guide_id", parentId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guides:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    const parsedGuides = data
      .map((g) => {
        if (g == null) return null;

        return guideSchema.parse(g);
      })
      .filter((g) => g != null);
    return parsedGuides;
  } catch (error) {
    console.error("Error fetching guides:", error);
    return null;
  }
}
