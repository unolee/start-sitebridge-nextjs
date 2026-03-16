import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_DIR = process.env.DB_DIR || path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "app.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS welcome (
      id INTEGER PRIMARY KEY,
      message TEXT NOT NULL
    );
  `);

  // Seed default welcome message
  const row = db.prepare("SELECT COUNT(*) as cnt FROM welcome").get() as { cnt: number };
  if (row.cnt === 0) {
    db.prepare("INSERT INTO welcome (id, message) VALUES (1, ?)").run(
      "Welcome to SiteBridge! 🚀 Your Next.js + React app is up and running."
    );
  }
}
