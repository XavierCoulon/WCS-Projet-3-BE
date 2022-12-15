import { Router } from "express";
import categories from "./category/routes";

const router = Router();

router.use("/category", categories);

export default router;
