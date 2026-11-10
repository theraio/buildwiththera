import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "~/widgets/trpc/constants";

/**
 * Builds the per-request tRPC context by reading the auth cookie. There is
 * no real session/user lookup yet — no auth backend exists in this
 * template. This only proves the token-presence plumbing works; swap in a
 * real session lookup once one exists.
 *
 * @returns The request context, with `authToken` set when the cookie is present.
 */
export async function createContext() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return { authToken };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
