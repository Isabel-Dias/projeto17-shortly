import { Router } from "express";
import authSession from "../middlewares/authSession.middleware.js"
import { deleteUrl, getOneUrl, openUrl, postUrl } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", authSession, postUrl);
router.get("/urls/:id", getOneUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", authSession, deleteUrl);


export default router;