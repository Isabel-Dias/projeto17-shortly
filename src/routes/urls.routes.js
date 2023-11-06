import { Router } from "express";
import authSession from "../middlewares/authSession.middleware.js"
import { getOneUrl, postUrl } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", authSession, postUrl);
router.get("/urls/:id", getOneUrl);


export default router;