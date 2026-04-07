import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distDir = path.join(__dirname, "dist");

// Serve static assets
app.use(express.static(distDir));

// Serve the app under /oracle (SPA fallback)
app.get("/oracle/*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

// Optional: redirect root to /oracle/
app.get("/", (req, res) => res.redirect(302, "/oracle/"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/oracle/`);
});