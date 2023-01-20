import { Router } from "express";
import favoriteController from "./controller";

const router = Router();

router.post("/add", favoriteController.add);
router.post("/remove", favoriteController.remove);
router.get("/", favoriteController.getAll);
router.get("/:videoId/isFavorite", favoriteController.isFavorite);

export default router;
