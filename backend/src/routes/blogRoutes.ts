import { Hono } from "hono";
import { createBlog,updateBlog,deleteBlog,getallblogs,authorblogs,blogById } from "../controllers/blogControllers";
import authmiddleware from "../middleware/authmiddleware";

const router = new Hono()
router.post("/createblog" , authmiddleware, createBlog) //
router.put("/:id",authmiddleware, updateBlog) //
router.delete("/:id", authmiddleware, deleteBlog) //
router.get("/all-blogs",getallblogs) 
router.get("/author-blog", authmiddleware, authorblogs)
router.get("/:id", authmiddleware, blogById)


export default router