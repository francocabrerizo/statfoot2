const express = require("express");
const app     = express();

// Middleware — lo veremos en profundidad la próxima sesión
app.use(express.json()); // parsea body JSON automáticamente

// ── Rutas ───────────────────────────────────────────
// Express maneja el routing de forma declarativa y limpia
app.get("/api/players", (req, res) => {
  const players = [
    { nombre: "R. Lewandowski", club: "FC Barcelona", goles: 27 },
    { nombre: "K. Mbappé",      club: "Real Madrid",  goles: 24 },
  ];

  res.status(200).json({ status: "ok", players });
  // .json() hace JSON.stringify + Content-Type: application/json automáticamente
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.url} no encontrada` });
});

// ── Arranque ────────────────────────────────────────
app.listen(3000, () => {
  console.log("🟢 StatFoot API corriendo en http://localhost:3000");
});