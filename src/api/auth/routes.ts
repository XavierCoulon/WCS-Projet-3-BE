import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);
router.post("/signout", controller.signOut);

export default router;
