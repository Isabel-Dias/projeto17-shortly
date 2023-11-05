import { Router } from "express";
import authSession from "../middlewares/authSession.middleware.js"
import { postUrl } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", authSession, postUrl);


export default router;