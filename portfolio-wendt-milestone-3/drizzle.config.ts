import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./webtecpr.db",
  },
});
