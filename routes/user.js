import e from "express";
import { getMyDetail, login, newUser,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=e.Router();
router.get("/me",isAuthenticated,getMyDetail)

router.post("/new",newUser)

router.post("/login",login)
router.get("/logout",logout)


export default router;