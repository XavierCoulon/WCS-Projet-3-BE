import { Router } from "express";

import videos from "./videos/routes";
import categories from "./category/routes";
import dynamic_sections from "./section-dynamic/routes";
import static_sections from "./section-static/routes";
import advertisings from "./advertisings/routes";

const router = Router();

router.use("/categories", categories);
router.use("/dynamic-sections", dynamic_sections);
router.use("/static-sections", static_sections);
router.use("/videos", videos);
router.use("/advertisings", advertisings);

export default router;
