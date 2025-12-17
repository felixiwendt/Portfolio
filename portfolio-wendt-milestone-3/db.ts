import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todo", {
  id: int().primaryKey({ autoIncrement: true }),
  label: text().notNull(),
  created_at: text().notNull(),
});

export const contactTable = sqliteTable("contact", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull(),
  subject: text(),
  message: text().notNull(),
  created_at: text().notNull(),
});

export const projectTable = sqliteTable("project", {
  id: int().primaryKey({ autoIncrement: true }),
  projectId: int().notNull(),
  likes: int().notNull().default(0),
});

export const commentTable = sqliteTable("comment", {
  id: int().primaryKey({ autoIncrement: true }),
  projectId: int().notNull(),
  author: text(),
  content: text().notNull(),
  created_at: text().notNull(),
});
