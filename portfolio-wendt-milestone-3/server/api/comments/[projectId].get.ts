import { db } from "../../..";
import { commentTable } from "~/db";
import { eq } from "drizzle-orm";
import { getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const projectId = Number(getRouterParam(event, "projectId"));
  const comments = await db
    .select()
    .from(commentTable)
    .where(eq(commentTable.projectId, projectId));
  return { comments };
});
