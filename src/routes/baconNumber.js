import { Router } from "express";
import controllers from "../controllers";

const router = Router();

// Gets the bacon number for a given actor
router.get("/baconNumber/:actorName", controllers.findActor);

export default router;
