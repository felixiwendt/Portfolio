import { db } from "../..";
import { projectTable } from "~/db";

export default defineEventHandler(async () => {
  const projects = await db.select().from(projectTable);
  return { projects };
});
