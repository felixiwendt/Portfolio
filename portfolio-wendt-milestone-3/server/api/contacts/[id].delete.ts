import { eq } from "drizzle-orm";
import { db } from "../../..";
import { contactTable } from "~/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await db
    .delete(contactTable)
    .where(eq(contactTable.id, Number(id)));

  return { message: "contact deleted successfully" };
});
