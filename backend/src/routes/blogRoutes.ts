import { Hono } from "hono";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getallblogs,
  authorblogs,
  blogById,
} from "../controllers/blogControllers";
import authmiddleware from "../middleware/authmiddleware";
import { Bindings } from "hono/types";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
router.post("/createblog", authmiddleware, createBlog); //
router.put("/:id", authmiddleware, updateBlog); //
router.delete("/:id", authmiddleware, deleteBlog); //
router.get("/bulk", getallblogs);
router.get("/author-blog", authmiddleware, authorblogs);
router.get("/:id", authmiddleware, blogById);

export default router;
