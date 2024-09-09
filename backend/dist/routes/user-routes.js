import { Router } from "express";
import { addTeammate, editUser, getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { editUserValidator, loginValidator, signupValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/add-teammate", verifyToken, addTeammate);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.patch("/edit-user", validate(editUserValidator), editUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map