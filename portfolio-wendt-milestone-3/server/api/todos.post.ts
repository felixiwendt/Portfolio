import { db } from "../..";
import { todoTable } from "~/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log({ body });

  const results = await db.insert(todoTable).values({
    label: body.label,
    created_at: new Date().toISOString(),
  });
  return { todos: results.rows };
});
