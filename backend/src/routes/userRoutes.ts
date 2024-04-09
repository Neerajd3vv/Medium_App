import { Hono } from "hono";
import {
  signin,
  signup,
  userDelete,
  getUserById,
  firstMount,
} from "../controllers/userControllers";

const userRouter = new Hono();
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.delete("/deleteuser/:id", userDelete);
userRouter.get("/:id", getUserById);
userRouter.post("/verify", firstMount);

export default userRouter;
