import express from "express";
const router = express.Router();
import { TranslationController } from "../controllers/translations";

router.get("/api/v1/translations/:page", async (req, res) => {
  const results = await TranslationController(req.params.page);
  return res.send(results);
});

export { router as translationRouter };
