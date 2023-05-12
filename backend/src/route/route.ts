import { Router } from "express";
import { chatWithGPT } from "../controller/controller";
import { bffMiddleware } from "../middleware/BFF";

const router = Router();

router.post("/api/chatblock", bffMiddleware, chatWithGPT);

export default router;
