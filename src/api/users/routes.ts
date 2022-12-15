import { Router } from "express";
import userController from "./controller";

const router = Router();

//TODO - Add middleware hashPassword
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
