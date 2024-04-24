import { Hono } from "hono";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getallblogs,
  authorblogs,
  blogById,
  userSearchedBlogs,
} from "../controllers/blogControllers";
import authmiddleware from "../middleware/authmiddleware";
import { Bindings } from "hono/types";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
router.post("/createblog", authmiddleware, createBlog); //
router.put("/updateblog/:id", authmiddleware, updateBlog); //
router.delete("/blogdeleted", authmiddleware, deleteBlog); //
router.get("/bulk", getallblogs);
router.get("/authorblog", authmiddleware, authorblogs);
router.get("/:id", authmiddleware, blogById);
router.post("/searchedblogs", authmiddleware, userSearchedBlogs);

export default router;
