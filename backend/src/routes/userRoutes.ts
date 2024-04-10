import { Hono } from "hono";
import {
  signin,
  signup,
  userDelete,
  getUserById,
  firstMount,
  loggedUser,
} from "../controllers/userControllers";
import authmiddleware from "../middleware/authmiddleware";

const userRouter = new Hono();
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.delete("/deleteuser/:id", userDelete);
userRouter.get("/:id", getUserById);
userRouter.post("/loggedinuser", authmiddleware, loggedUser);
userRouter.post("/verify", firstMount);

export default userRouter;
