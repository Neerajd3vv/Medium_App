import { Hono } from "hono";
import {
  signin,
  signup,
  userDelete,
  getUserById,
  loggedUser,
  bioUser,
  userBioCheck,
  userBioUpdate,
} from "../controllers/userControllers";
import authmiddleware from "../middleware/authmiddleware";

const userRouter = new Hono();
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.delete("/deleteuser/:id", userDelete);
userRouter.get("/:id", getUserById);
userRouter.post("/loggedinuser", authmiddleware, loggedUser);
userRouter.post("/loggedinuser", authmiddleware, loggedUser);
userRouter.post("/userbio", authmiddleware, bioUser);
userRouter.post("/userbiocheck", authmiddleware, userBioCheck);
userRouter.post("/bioupdate", authmiddleware, userBioUpdate);

export default userRouter;
