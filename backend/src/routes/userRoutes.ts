import { Hono } from "hono";
import storage from "../middleware/MulterMiddleware";
import {
  signin,
  signup,
  userDelete,
  getUserById,
  loggedUser,
  // bioUser,
  userBioCheck,
  userProfileUpdate,
} from "../controllers/userControllers";
import authmiddleware from "../middleware/authmiddleware";

const userRouter = new Hono();
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.delete("/deleteuser/:id", userDelete);
userRouter.get("/:id", getUserById);
userRouter.post("/loggedinuser", authmiddleware, loggedUser);
userRouter.post("/loggedinuser", authmiddleware, loggedUser);
userRouter.post("/userbiocheck", authmiddleware, userBioCheck);
userRouter.post("/userbiocheck", authmiddleware, userBioCheck);
userRouter.post("/userprofileupdate", authmiddleware,   userProfileUpdate);



export default userRouter;
 