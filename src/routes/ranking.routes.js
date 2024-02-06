import { Router } from "express";
import getRankings from "../controllers/ranking.controller.js";

const router = Router();

router.get("/ranking", getRankings);

export default router;