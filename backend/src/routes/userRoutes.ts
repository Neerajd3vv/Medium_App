import { Hono } from "hono";
import {
  signin,
  signup,
  userDelete,
  getUserById,
  loggedUser,
  userBioCheck,
  userProfileUpdate,
  userProfile,
  // userProfile,
} from "../controllers/userControllers";
import authmiddleware from "../middleware/authmiddleware";
import upload from "../middleware/MulterMiddleware";

const userRouter = new Hono();
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.delete("/deleteuser/:id", userDelete);
userRouter.get("/:id", getUserById);
userRouter.post("/loggedinuser", authmiddleware, loggedUser);
userRouter.post("/userbiocheck", authmiddleware, userBioCheck);
userRouter.post("/userprofile", authmiddleware,  userProfile);
userRouter.post("/userprofileupdate", authmiddleware, userProfileUpdate);
userRouter.post("/userprofile", authmiddleware, userProfile );

export default userRouter;
