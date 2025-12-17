import { db } from "../..";
import { commentTable } from "~/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log({ body });

  const results = await db.insert(commentTable).values({
    projectId: body.projectId,
    author: body.name?.trim() ? body.name : "Anonym",
    content: body.comment,
    created_at: new Date().toISOString(),
  });
  return { contacts: results.rows };
});
