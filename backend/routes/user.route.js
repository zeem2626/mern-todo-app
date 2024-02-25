import { Router } from "express";
import { register, login, logout ,currentUser} from "../controllers/auth.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Secure Routes
router.post("/logout", verifyUser, logout);
router.get("/user", verifyUser, currentUser);

export default router;
