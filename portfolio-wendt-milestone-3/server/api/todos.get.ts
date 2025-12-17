import { db } from "../..";
import { todoTable } from "~/db";

export default defineEventHandler(async () => {
  const todos = await db.select().from(todoTable);
  return { todos };
});
