/**
 * @description: This is the route handler for generating a guide.
 * @Author: Alex Joshua
 * @Date: 2025-3-31
 */

import { generateGuide } from "@/lib/ai/guides";
import { NextResponse } from "next/server";

/**
 * @description This function handles the POST request to generate a guide.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response containing the generated guide.
 * @throws {Error} If there is an error while generating the guide.
 */
export async function POST(request: Request) {
  const req = await request.json();

  console.log(
    "Sending out request to generate guide with this prompt: ",
    req.prompt
  );

  const guide = await generateGuide(req.prompt);
  console.log("Guide generated: ", guide);

  if (guide == null) {
    return NextResponse.json(
      { error: "Error generating guide" },
      { status: 500 }
    );
  }
  return NextResponse.json(guide, { status: 200 });
}
