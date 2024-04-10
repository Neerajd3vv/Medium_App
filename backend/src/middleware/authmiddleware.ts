import { Context, Next } from "hono";
import { verify } from "hono/jwt";

async function authmiddleware(c: Context, next: Next) {
  const token = c.req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return c.text("Token format is incorrect");
  }
  const fineToken = token.split(" ")[1];
  try {
    const decoded = await verify(fineToken, c.env.JWT_KEY);
    

    if (!decoded) {
      return c.text(" Token Not decoded");
    } else {
      c.set("authorId", decoded);
      await next()
    }
  } catch (error) {
    return c.json({ msg: "Unauthorized" }, 401);
  }
}

export default authmiddleware