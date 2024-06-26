import zod from 'zod';
export declare const signupSchema: zod.ZodObject<{
    username: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export declare const signinSchema: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const newBlogSchema: zod.ZodObject<{
    title: zod.ZodString;
    body: zod.ZodString;
    coverphoto: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    title: string;
    body: string;
    coverphoto?: string | undefined;
}, {
    title: string;
    body: string;
    coverphoto?: string | undefined;
}>;
export declare const updateSchema: zod.ZodObject<{
    title: zod.ZodString;
    body: zod.ZodString;
    coverphoto: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    title: string;
    body: string;
    coverphoto?: string | undefined;
}, {
    title: string;
    body: string;
    coverphoto?: string | undefined;
}>;
export type SignupSchema = zod.infer<typeof signupSchema>;
export type SigninSchema = zod.infer<typeof signinSchema>;
export type NewBlogSchema = zod.infer<typeof newBlogSchema>;
export type UpdateSchema = zod.infer<typeof updateSchema>;
