import { Router } from "express"; 
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/userController";
import { authUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(authUser,getUserProfile).put(authUser,updateUserProfile);

export default router;