import "dotenv/config";
import express from "express";

import { getEntries } from "./routes/entries.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();

const welcomeStrings = [
  "Hello World!",
  "This is the public Nilho API (nilho.co)",
];

app.get("/entries", authMiddleware, getEntries);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
