import express from "express";
const router = express.Router();

router.get("/api/v1/translations/:page", (req, res) => {
  return res.send(req.params);
});

export { router as translationRouter };
