import "dotenv/config";
import express from "express";

import { getEntries } from "./routes/entries.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <p>CuponHub Public API - Check the docs at <a href="https://github.com/tomasCalletce/cuponhub-public-api">GitHub</a></p>
      </body>
    </html>
  `);
});

app.get("/entries", authMiddleware, getEntries);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
