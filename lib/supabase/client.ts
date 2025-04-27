import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/database.types";

export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
}

/**
 * Inject Clerk authentication into Supabase client
 *
 * @returns Supabase client with Clerk authentication
 */

// export async function createClerkSupabaseClientSsr() {
//   const { getToken } = await auth();

//   return createClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       global: {
//         fetch: async (url, options = {}) => {
//           const clerkToken = await getToken({
//             template: "supabase",
//           });

//           const headers = new Headers(options?.headers);
//           headers.set("Authorization", `Bearer ${clerkToken}`);

//           return fetch(url, {
//             ...options,
//             headers,
//           });
//         },
//       },
//     }
//   );
// }
