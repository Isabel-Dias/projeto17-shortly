import { Router } from "express";
import signUp from "../controllers/signUp.controller.js";
import signIn from "../controllers/signIn.controller.js";
import AuthSession from "../middlewares/authSession.middleware.js";
import userData from "../controllers/userData.controller.js";
import getRankings from "../controllers/ranking.controller.js";


const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users/me", AuthSession, userData)
router.get("/ranking", getRankings);

export default router;