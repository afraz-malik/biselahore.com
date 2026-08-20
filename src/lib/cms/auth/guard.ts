import "server-only";

import { assertSameOrigin } from "./same-origin";
import { isAuthenticated } from "./session";

/** Defense-in-depth guard called at the top of every CMS Server Action. */
export async function requireCmsAuth(): Promise<void> {
  await assertSameOrigin();
  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated.");
  }
}
