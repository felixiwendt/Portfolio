import { db } from "../..";
import { contactTable } from "~/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log({ body });

  const results = await db.insert(contactTable).values({
    email: body.email,
    subject: body.subject || "",
    message: body.message,
    created_at: new Date().toISOString(),
  });
  return { contacts: results.rows };
});
