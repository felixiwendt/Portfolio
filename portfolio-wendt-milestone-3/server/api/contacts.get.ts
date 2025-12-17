import { db } from "../..";
import { contactTable } from "~/db";

export default defineEventHandler(async () => {
  const contacts = await db.select().from(contactTable);
  return { contacts };
});
