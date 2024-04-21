import { Context } from "hono/";
import { newBlogSchema, updateSchema } from "@neerajrandom/medium-cloned";
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
      coverphoto: string;
    } = await c.req.json();

    const { success } = newBlogSchema.safeParse(body);
    if (!success) {
      return c.body("Zod validation failed", 400);
    }
    const newBlogPost = await prisma.blogs.create({
      data: {
        title: body.title,
        body: body.body,
        coverphoto: body.coverphoto,
        authorId: c.get("authorId"),
      },
      include: {
        author: true,
      },
    });

    console.log("newBlogPost", newBlogPost);
    
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const postPublishDate = new Date(newBlogPost.publishDate);
    const properDate = `${postPublishDate.getDate()} ${
      months[postPublishDate.getMonth()]
    } ${postPublishDate.getFullYear()}`;

    return c.json({
      msg: "Blog created Successfully",
      Blog: {
        id: newBlogPost.id,
        title: newBlogPost.title,
        content: newBlogPost.body,
        authorId: newBlogPost.authorId,
        authorName: newBlogPost.author.username,
        publishDate: properDate,
        coverPhotoUrl : newBlogPost.coverphoto
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
    const { title } = (c.req.query() as { title?: string }) || "";
    console.log(title);
    const multipleBlogs = await prisma.blogs.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      include: {
        author: {
          select: {
            username: true,
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
      },
    });
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return c.json({
      Blogs: multipleBlogs.map((res) => ({
        id: res.id,
        title: res.title,
        content: res.body,
        authorId: res.authorId,
        authorname: res.author.username,
        publishDate: `${res.publishDate.getDate()} ${
          months[res.publishDate.getMonth()]
        } ${res.publishDate.getFullYear()}`,
        profilePicture: res.author.profile?.profilePicture,
        coverphoto: res.coverphoto
      })),
    });
  } catch (error) {
    return c.body(`Internal server down:`, 500);
  } finally {
    await prisma.$disconnect(); // disconnect the prisma for efficieny
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
        author: {
          select: {
            username: true,
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
      },
    });
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return c.json({
      AuthorBlogs: authorPosts.map((res) => ({
        id: res.id,
        title: res.title,
        body: res.body,
        authorname: res.author.username,
        publishDate: `${res.publishDate.getDate()} ${
          months[res.publishDate.getMonth()]
        } ${res.publishDate.getFullYear()}`,
        profilePicture: res.author.profile?.profilePicture,
        coverphoto : res.coverphoto
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
        author: {
          select: {
          username :true,
          profile:{
            select:{
              bio: true,
              profilePicture:true
            }
          }
          },
        },
      },
    });
    if (!blogExists) {
      return c.body("Post does not exists", 404);
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const postPublishDate = new Date(blogExists.publishDate);
    const properDate = `${postPublishDate.getDate()} ${
      months[postPublishDate.getMonth()]
    } ${postPublishDate.getFullYear()}`;

    return c.json({
      id: blogExists.id,
      title: blogExists.title,
      content: blogExists.body,
      authorId: blogExists.authorId,
      authorname: blogExists.author.username,
      profileImage: blogExists.author.profile?.profilePicture,
      publishDate: properDate,
      authorBio: blogExists.author.profile?.bio,
      coverphoto: blogExists.coverphoto
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
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const postPublishDate = new Date(Blog.publishDate);
    const properDate = `${postPublishDate.getDate()} ${
      months[postPublishDate.getMonth()]
    } ${postPublishDate.getFullYear()}`;
    return c.json({
      updatedBlog: {
        authorName: Blog.author.username,
        title: Blog.title,
        content: Blog.body,
        publishDate: properDate,
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
    const body : {id: string} = await c.req.json()
    await prisma.blogs.delete({
      where:{
        id:body.id
      }
    });
    return c.text("Blog post deleted!");
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}
