"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing = exports.deleteAllBlogs = exports.increaseCounter = exports.popularityScore = exports.actuallyDeleteBlog = exports.updateBlog = exports.recoverBlog = exports.deleteBlog = exports.getBlogsByAuthor = exports.getBlog = exports.getBlogs = exports.likeBlog = exports.createBlog = void 0;
const dbconnection_1 = require("../database/dbconnection");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = yield dbconnection_1.prisma.blog.create({
            data: req.body
        });
        if (!newBlog)
            throw 'Not created';
        res.status(201).send(newBlog);
    }
    catch (err) {
        if (err = 'Not created')
            res.status(422).send('This blog could not be created');
    }
});
exports.createBlog = createBlog;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const blogLike = yield dbconnection_1.prisma.blog.update({
                where: {
                    id: +req.params.id,
                    liked: false
                },
                data: {
                    liked: true,
                    likeCounter: {
                        increment: 1
                    }
                },
            });
            if (!blogLike)
                throw 'Empty';
            res.status(200).send(blogLike);
        }
        catch (_a) {
            const blogLike = yield dbconnection_1.prisma.blog.update({
                where: {
                    id: +req.params.id,
                    liked: true
                },
                data: {
                    liked: false,
                    likeCounter: {
                        increment: -1
                    }
                },
            });
            if (!blogLike)
                throw 'Empty';
            res.status(200).send(blogLike);
        }
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send("This blog's liked status could not be updated");
    }
});
exports.likeBlog = likeBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield dbconnection_1.prisma.blog.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        if (!blogs)
            throw 'Empty';
        res.status(200).send(blogs);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(404).send('No blogs could be found');
    }
});
exports.getBlogs = getBlogs;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specificBlog = yield dbconnection_1.prisma.blog.findFirst({
            where: {
                id: +req.params.id
            }
        });
        if (!specificBlog)
            throw 'Empty';
        res.status(200).send(specificBlog);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(404).send('This blog could not be found');
    }
});
exports.getBlog = getBlog;
const getBlogsByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorBlogs = yield dbconnection_1.prisma.blog.findMany({
            where: {
                authorId: +req.params.authorId
            }
        });
        if (!authorBlogs)
            throw 'Empty';
        res.status(200).send(authorBlogs);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(404).send('No blogs from this author could be found');
        if (err = 'No blogs')
            res.status(404).send('This author has no blogs');
    }
});
exports.getBlogsByAuthor = getBlogsByAuthor;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogDelete = yield dbconnection_1.prisma.blog.update({
            where: {
                id: +req.params.id,
            },
            data: {
                deleted: true,
            }
        });
        if (!blogDelete)
            throw 'Empty';
        res.status(204).send(blogDelete);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send('This blog could not be deleted');
    }
});
exports.deleteBlog = deleteBlog;
const recoverBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogRecover = yield dbconnection_1.prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: {
                deleted: false
            }
        });
        if (!blogRecover)
            throw 'Empty';
        res.status(200).send(blogRecover);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send('This blog could not be recovered');
    }
});
exports.recoverBlog = recoverBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogUpdate = yield dbconnection_1.prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        });
        if (!blogUpdate)
            throw 'Empty';
        res.status(200).send(blogUpdate);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send('This blog could not be updated');
    }
});
exports.updateBlog = updateBlog;
const actuallyDeleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogFinalDelete = yield dbconnection_1.prisma.blog.delete({
            where: {
                id: +req.params.id
            }
        });
        if (!blogFinalDelete)
            throw 'Undeletable';
        res.status(204).send(blogFinalDelete);
    }
    catch (err) {
        if (err = 'Undeletable')
            res.status(400).send('This blog could not be completely deleted');
    }
});
exports.actuallyDeleteBlog = actuallyDeleteBlog;
const popularityScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dbconnection_1.prisma.user.findMany({});
        const usersLength = users.length;
        const specificBlog = yield dbconnection_1.prisma.blog.findFirst({
            where: {
                id: +req.params.id
            }
        });
        const likes = specificBlog.likeCounter;
        const popularity = (likes / (usersLength - 1)) * 100;
        if (!specificBlog)
            throw 'No blog';
        res.status(200).send(popularity + '%');
    }
    catch (err) {
        if (err = 'No blog')
            res.status(404).send('This blog could not be found');
    }
});
exports.popularityScore = popularityScore;
// - - - - - - - -
const increaseCounter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogCounter = yield dbconnection_1.prisma.blog.update({
            where: {
                id: +req.params.id
            },
            data: {
                likeCounter: {
                    increment: 1
                }
            }
        });
        if (!blogCounter)
            throw 'Empty';
        res.status(200).send(blogCounter);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send("This blog's like counter could not be increased");
    }
});
exports.increaseCounter = increaseCounter;
const deleteAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogDelete = yield dbconnection_1.prisma.blog.deleteMany({});
        if (!blogDelete)
            throw 'Undeletable';
        res.status(204).send(blogDelete);
    }
    catch (err) {
        if (err = 'Undeletable')
            res.status(400).send('The blog could not be deleted');
    }
});
exports.deleteAllBlogs = deleteAllBlogs;
const testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dbconnection_1.prisma.user.findMany({
            take: 1,
            orderBy: {
                id: 'desc',
            },
        });
        res.status(200).send(users);
    }
    catch (err) {
        res.status(400).send('The testing did not work');
    }
});
exports.testing = testing;
