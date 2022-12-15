import { Router } from "express";
import categories from "./category/routes";
import dynamic_sections from "./section-dynamic/routes";
import static_sections from "./section-static/routes";

const router = Router();

router.use("/categories", categories);
router.use("/dynamic-sections", dynamic_sections);
router.use("/static-sections", static_sections);

export default router;
