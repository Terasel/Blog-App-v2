"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServer = exports.appUsers = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const blog_routes_1 = __importDefault(require("../routes/blog.routes"));
exports.appUsers = (0, express_1.default)();
exports.appUsers.use(express_1.default.json());
exports.appUsers.use('/api', user_routes_1.default);
exports.appUsers.use('/api', blog_routes_1.default);
exports.userServer = exports.appUsers.listen(3010);
console.log('Server on port', 3010);
