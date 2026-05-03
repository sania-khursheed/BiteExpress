import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "bite-express-secret";
const db = new Database("bite_express.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin'
  );

  CREATE TABLE IF NOT EXISTS food_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    imageUrl TEXT,
    category TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Admin User
const createAdmin = () => {
  const adminEmail = "saniakhursheed2510@gmail.com";
  const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(adminEmail);
  if (!existing) {
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, 'admin')").run(adminEmail, hashedPassword);
    console.log("Admin seeded: ", adminEmail, " (pwd: admin123)");
  }
};
createAdmin();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
      req.user = user;
      next();
    });
  };

  // --- API Routes ---

  // Auth
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ token, user: { email: user.email, role: user.role } });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out" });
  });

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Food Items
  app.get("/api/food-items", (req, res) => {
    const items = db.prepare("SELECT * FROM food_items ORDER BY createdAt DESC").all();
    res.json(items);
  });

  app.get("/api/food-items/popular", (req, res) => {
    const items = db.prepare("SELECT * FROM food_items LIMIT 6").all();
    res.json(items);
  });

  app.post("/api/food-items", authenticateToken, (req, res) => {
    const { name, price, description, imageUrl, category } = req.body;
    const info = db.prepare("INSERT INTO food_items (name, price, description, imageUrl, category) VALUES (?, ?, ?, ?, ?)").run(name, price, description, imageUrl, category);
    res.json({ id: info.lastInsertRowid, name, price, description, imageUrl, category });
  });

  app.put("/api/food-items/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, price, description, imageUrl, category } = req.body;
    db.prepare("UPDATE food_items SET name = ?, price = ?, description = ?, imageUrl = ?, category = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?").run(name, price, description, imageUrl, category, id);
    res.json({ success: true });
  });

  app.delete("/api/food-items/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM food_items WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
