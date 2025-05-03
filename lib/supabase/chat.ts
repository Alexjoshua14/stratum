"use server";

import { UUID } from "crypto";
import { createServerSupabaseClient } from "./client";
import { Database } from "./types/database.types";
import { Message } from "ai";

const client = createServerSupabaseClient();

function reconstructMessage(
  message: Database["public"]["Tables"]["guide_messages"]["Row"]
): Message {
  const m: Message = JSON.parse(message.content);

  return m;
}

export async function getChatMessagesById(
  guide_id: string,
  limit: number = 100,
  offset: number = 0
): Promise<Message[] | null> {
  try {
    const { data, error } = await client
      .from("guide_messages")
      .select("*")
      .eq("guide_id", guide_id)
      .order("created_at", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching chat messages:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    const parsedData = data.map((message) => reconstructMessage(message));

    return parsedData;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return null;
  }
}

/**
 * Get recent chat messages for a specific guide, default to 10 messages
 * @param guide_id
 * @param limit
 * @returns
 */
export async function getRecentChatMessages(
  guide_id: string,
  limit: number = 10
): Promise<Message[] | null> {
  try {
    const { data, error } = await client
      .from("guide_messages")
      .select("*")
      .eq("guide_id", guide_id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recent chat messages:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    const parsedData = data
      .map((message) => reconstructMessage(message))
      .reverse();

    return parsedData;
  } catch (error) {
    console.error("Error fetching recent chat messages:", error);
    return null;
  }
}

/**
 * Saves a chat message to the database
 * @param guide_id
 * @param content
 * @param role
 * @param user_id
 */
export async function saveChatMessage({
  guide_id,
  message,
  role,
}: {
  guide_id: UUID;
  message: Message;
  role: "user" | "assistant";
}) {
  const content = JSON.stringify(message);

  try {
    const { data, error } = await client.from("guide_messages").insert({
      guide_id,
      content,
      role,
    });

    if (error) {
      console.error("Error saving chat message:", error);
      return null;
    }

    if (data == null) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error saving chat message:", error);
    return null;
  }
}
