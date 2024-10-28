"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServer = exports.appBlog = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const blog_routes_1 = __importDefault(require("../routes/blog.routes"));
exports.appBlog = (0, express_1.default)();
exports.appBlog.use(express_1.default.json());
exports.appBlog.use('/api', user_routes_1.default);
exports.appBlog.use('/api', blog_routes_1.default);
exports.blogServer = exports.appBlog.listen(3020);
console.log('Server on port', 3020);
