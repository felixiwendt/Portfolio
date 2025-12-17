import { db } from "../../..";
import { projectTable } from "~/db";
import { eq, sql } from "drizzle-orm";
import { getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  // Likes um 1 erhöhen mit rohem SQL-Ausdruck
  await db
    .update(projectTable)
    .set({ likes: sql`likes + 1` })
    .where(eq(projectTable.projectId, id));

  // Neue Likes-Zahl zurückgeben
  const updated = await db
    .select({ likes: projectTable.likes })
    .from(projectTable)
    .where(eq(projectTable.projectId, id));
  return { likes: updated[0]?.likes ?? 0 };
});
