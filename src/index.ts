import "dotenv/config";
import express from "express";

import { getEntries } from "./routes/entries.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello World, this is the public Nilho API (nilho.co), check the docs at https://github.com/tomasCalletce/cuponhub-public-api",
  });
});

app.get("/entries", authMiddleware, getEntries);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
