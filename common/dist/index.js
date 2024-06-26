"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.newBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// zod schema -> bckend will require these schema's
exports.signupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.signinSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
// createBlog schema
exports.newBlogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    body: zod_1.default.string(),
    coverphoto: zod_1.default.string().optional()
});
// update blogSchema
exports.updateSchema = zod_1.default.object({
    title: zod_1.default.string(),
    body: zod_1.default.string(),
    coverphoto: zod_1.default.string().optional()
});
