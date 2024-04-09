import zod from 'zod'

// zod schema -> bckend will require these schema's
export const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
  });
  
  export const signinSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
  });
  

  // creteBlog schema
export const newBlogSchema = zod.object({
    title: zod.string(),
    body: zod.string(),
  });
  
  // update blogSchema
export   const updateSchema = zod.object({
    title: zod.string(),
    body: zod.string(),
  });

// frontend will need this 
export type SignupSchema = zod.infer<typeof signupSchema>
export type SigninSchema = zod.infer<typeof signinSchema>
export type NewBlogSchema = zod.infer<typeof newBlogSchema>
export type UpdateSchema = zod.infer<typeof updateSchema>

