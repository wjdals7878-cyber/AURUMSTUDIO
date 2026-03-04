import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    videoUrl TEXT,
    imageUrl TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial data if empty
const portfolioCount = db.prepare("SELECT COUNT(*) as count FROM portfolio").get() as { count: number };
if (portfolioCount.count === 0) {
  const insert = db.prepare("INSERT INTO portfolio (title, description, videoUrl, imageUrl, category) VALUES (?, ?, ?, ?, ?)");
  insert.run("브랜드 필름 - 2024", "아우룸스튜디오의 감각적인 브랜드 필름입니다.", "https://www.youtube.com/embed/dQw4w9WgXcQ", "https://picsum.photos/seed/video1/800/450", "Brand Film");
  insert.run("뮤직비디오 - 아티스트 X", "몽환적인 분위기의 뮤직비디오 제작 사례입니다.", "https://www.youtube.com/embed/dQw4w9WgXcQ", "https://picsum.photos/seed/video2/800/450", "Music Video");
  insert.run("광고 영상 - 테크 기업", "세련된 모션 그래픽이 돋보이는 광고 영상입니다.", "https://www.youtube.com/embed/dQw4w9WgXcQ", "https://picsum.photos/seed/video3/800/450", "Commercial");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/portfolio", (req, res) => {
    const items = db.prepare("SELECT * FROM portfolio ORDER BY id DESC").all();
    res.json(items);
  });

  app.post("/api/portfolio", (req, res) => {
    const { title, description, videoUrl, imageUrl, category } = req.body;
    const info = db.prepare("INSERT INTO portfolio (title, description, videoUrl, imageUrl, category) VALUES (?, ?, ?, ?, ?)").run(title, description, videoUrl, imageUrl, category);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/portfolio/:id", (req, res) => {
    db.prepare("DELETE FROM portfolio WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/inquiries", (req, res) => {
    const items = db.prepare("SELECT * FROM inquiries ORDER BY createdAt DESC").all();
    res.json(items);
  });

  app.post("/api/inquiries", (req, res) => {
    const { name, email, message } = req.body;
    const info = db.prepare("INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)").run(name, email, message);
    res.json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
