import { Router } from "express";
import favoriteController from "./controller";

const router = Router();

router.post("/add/:userId/:videoId", favoriteController.add);
router.post("/remove/:userId/:videoId", favoriteController.remove);
router.get("/", favoriteController.getAll);
router.get("/isFavorite/:userId/:videoId", favoriteController.isFavorite);

export default router;
