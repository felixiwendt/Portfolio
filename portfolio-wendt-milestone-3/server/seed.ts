import { db } from "..";
import { projectTable } from "../db";

async function seedProjects() {
  const projects = [
    { projectId: 0, likes: 0 },
    { projectId: 1, likes: 0 },
    { projectId: 2, likes: 0 },
  ];

  for (const project of projects) {
    await db.insert(projectTable).values(project).onConflictDoNothing();
  }
  console.log("Projekte angelegt!");
}

seedProjects();
