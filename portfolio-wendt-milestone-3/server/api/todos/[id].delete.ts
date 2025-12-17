import { eq } from "drizzle-orm";
import { db } from "../../..";
import { todoTable } from "~/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await db.delete(todoTable).where(eq(todoTable.id, Number(id)));

  return { message: "Todo deleted successfully" };
});
