import { Router } from "express";

import videos from "./videos/routes";
import categories from "./category/routes";

const router = Router();

router.use("/videos", videos);
router.use("/category", categories);

export default router;
