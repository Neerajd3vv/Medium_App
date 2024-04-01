import { Context } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { signupSchema,signinSchema } from "@neerajrandom/medium-common";
import { sign } from "hono/jwt";

// status code
enum status {
  BARREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSION = 403,
}


export async function signup(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      username: string;
      email: string;
      password: string;
    } = await c.req.json();
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return c.text("Zod validation failed!");
    }
    const userExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!userExists) {
      const newUser = await prisma.user.create({
        data: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      });
      const authorId = newUser.id;
      const token = await sign(authorId, c.env.JWT_KEY);
      return c.json({
        message: "User created sucessfully!",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        token: token,
      });
    } else {
      return c.text("User already exist with that email change email");
    }
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}

export async function signin(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      email: string;
      password: string;
    } = await c.req.json();
    const { success } = signinSchema.safeParse(body);
    if (!success) {
      return c.text("Zod validation failed!");
    }
    const userExists = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!userExists) {
      return c.json({ msg: "User does'nt exist with those credentials" });
    } else {
      const authorId = userExists.id
      const token = await sign(authorId, c.env.JWT_KEY);
      return c.json({
        msg: "Logged in",
        user: {
          id: userExists.id,
          username: userExists.username,
        },
        token: token,
      });
    }
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}

export async function userDelete(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    if (!id) {
      return c.text("No user with such id ");
    }
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return c.json({ msg: "User deleted!" });
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}

export async function getUserById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.text("No user with such id ");
    }
    const userFound = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!userFound) {
      return c.text("No user found!")
    }
    return c.json({user: userFound})
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}
