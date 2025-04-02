/**
 * @description This file contains the API route for fetching and saving guides.
 * @author Alex Joshua
 * @date 2025-3-31
 */

import { guideSchema } from "@/lib/schemas/guides";
import { createGuide, getGuides } from "@/lib/supabase/guides";
import { NextResponse } from "next/server";

/**
 * @description This function handles the GET request to fetch all guides.
 * @returns {Promise<NextResponse>} The response containing the list of guides.
 * @throws {Error} If there is an error while fetching the guides.
 */
export async function GET() {
  const guides = await getGuides();

  if (guides == null) {
    return NextResponse.json(
      { error: "Error fetching guides" },
      { status: 500 }
    );
  }
  if (guides.length === 0) {
    return NextResponse.json({ message: "No guides ound" }, { status: 404 });
  }
  return NextResponse.json(guides, { status: 200 });
}

/**
 * @description This function handles the POST request to create a new guide.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response containing the created guide.
 * @throws {Error} If there is an error while creating the guide.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = guideSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.format() },
      { status: 422 }
    );
  }

  const result = await createGuide(parsedBody.data);

  if (result == null) {
    return NextResponse.json(
      { error: "Error creating guide" },
      { status: 500 }
    );
  }
  return NextResponse.json(result, { status: 201 });
}
