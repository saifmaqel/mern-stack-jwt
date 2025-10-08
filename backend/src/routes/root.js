import express from "express";
import path from "path";

const router = express.Router();

router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "index.html"));
});

export default router;
