import { Context } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { signupSchema, signinSchema } from "@neerajrandom/medium-common";
import { sign, verify } from "hono/jwt";

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
    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!userExists) {
      return c.json({ msg: "User doesn't exist with those credentials" });
    } else {
      const authorId = userExists.id;
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
      return c.text("No user found!");
    }
    return c.json({ user: userFound });
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}

export async function loggedUser(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userFound = await prisma.user.findFirst({
      where: {
        id: c.get("authorId"),
      },
    });
    console.log(userFound);

    if (!userFound) {
      return c.json({ msg: "No user with such id " });
    }
    return c.json({ User: userFound });
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}

// user bio api endpoint
export async function bioUser(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userBio = await c.req.text();
    const newBio = await prisma.profile.create({
      data: {
        bio: userBio,
        profileId: c.get("authorId"),
      },
    });
    return c.json({ Bio: newBio });
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}

export async function firstMount(c: Context) {
  const token = c.req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return c.json({ msg: "Token format incorrect" });
  }
  const actualToken = token.split(" ")[1];
  // console.log(actualToken);

  try {
    const decoded = await verify(actualToken, c.env.JWT_KEY);
    console.log(decoded);
    // console.log(decoded.authorId);
    if (!decoded) {
      return c.text("Decoding failed");
    }
    return c.json({ Userid: decoded });
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
}
