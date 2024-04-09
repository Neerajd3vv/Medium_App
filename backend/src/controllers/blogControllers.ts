import { Context } from "hono/";
import { newBlogSchema, updateSchema } from "@neerajrandom/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function createBlog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body: {
      title: string;
      body: string;
    } = await c.req.json();

    const { success } = newBlogSchema.safeParse(body);
    if (!success) {
      return c.body("Zod validation failed", 400);
    }
    const newBlogPost = await prisma.blogs.create({
      data: {
        title: body.title,
        body: body.body,
        authorId: c.get("authorId"),
      },
      include: {
        author: true,
      },
    });
    return c.json({
      msg: "Blog creted Successfully",
      Blog: {
        id: newBlogPost.id,
        title: newBlogPost.title,
        content: newBlogPost.body,
        authorId: newBlogPost.authorId,
        authorName: newBlogPost.author.username,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// allblogs in platform
export async function getallblogs(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const multipleBlogs = await prisma.blogs.findMany({
      include: {
        author: true,
      },
    });
    return c.json({
      Blogs: multipleBlogs.map((res) => ({
        id: res.id,
        title: res.title,
        content: res.body,
        authorId: res.authorId,
        authorname: res.author.username,
      })),
    });
  } catch (error) {
    return c.body(`Internal server down:`, 500);
  }
}

// allblogs of Author/user
export async function authorblogs(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const authorPosts = await prisma.blogs.findMany({
      where: {
        authorId: c.get("authorId"),
      },
      include: {
        author: true,
      },
    });
    return c.json({
      AuthorBlogs: authorPosts.map((res) => ({
        id: res.id,
        title: res.title,
        body: res.body,
        authorId: res.authorId,
        authorname: res.author.username,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// get blog by id

export async function blogById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    console.log(blogById);

    const blogExists = await prisma.blogs.findFirst({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });
    if (!blogExists) {
      return c.body("Post does not exists", 404);
    }

    return c.json({
      YourBlogs: {
        id: blogExists.id,
        title: blogExists.title,
        body: blogExists.body,
        authorname: blogExists.author.username,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function updateBlog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const body: {
      title: string;
      body: string;
    } = await c.req.json();
    const { success } = updateSchema.safeParse(body);
    if (!success) {
      return c.text("Zod validtion failed!");
    }
    const Blog = await prisma.blogs.update({
      where: {
        id: id,
        authorId: c.get("authorId"),
      },
      data: {
        title: body.title,
        body: body.body,
        authorId: c.get("authorId"),
      },
      include: {
        author: true,
      },
    });
    return c.json({
      updatedBlog: {
        authorName: Blog.author.username,
        title: Blog.title,
        content: Blog.body,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function deleteBlog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    await prisma.blogs.delete({
      where: {
        id: id,
      },
    });
    return c.text("Blog post deleted!");
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}
