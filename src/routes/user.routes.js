import { Router } from "express";
import signUp from "../controllers/signUp.controller.js";
import signIn from "../controllers/signIn.controller.js";


const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn)

export default router;