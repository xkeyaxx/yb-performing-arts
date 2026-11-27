/**
 * Small JSON-file data store for local development.
 * This keeps posts, events and ticket requests after server restarts.
 * For a public deployment, replace this adapter with a hosted database.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataPath = path.join(process.cwd(), "data", "site-data.json");
const emptyData = { events: [], posts: [], reservations: [] };

export async function readSiteData() {
  await mkdir(path.dirname(dataPath), { recursive: true });
  try {
    const raw = await readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw);
    return {
      events: Array.isArray(parsed.events) ? parsed.events : [],
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      reservations: Array.isArray(parsed.reservations) ? parsed.reservations : [],
    };
  } catch (error) {
    if (error && error.code !== "ENOENT") throw error;
    await writeFile(dataPath, JSON.stringify(emptyData, null, 2));
    return structuredClone(emptyData);
  }
}

export async function writeSiteData(data) {
  await mkdir(path.dirname(dataPath), { recursive: true });
  const temporaryPath = `${dataPath}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(data, null, 2), "utf8");
  const { rename } = await import("node:fs/promises");
  await rename(temporaryPath, dataPath);
}
