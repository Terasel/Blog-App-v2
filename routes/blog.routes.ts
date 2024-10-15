import { Router } from "express";
import { prisma } from "../infrastructure/dbconnection"
import { createBlog, likeBlog, getBlogs, getBlog, getBlogsByAuthor, deleteBlog, updateBlog, recoverBlog, actuallyDeleteBlog, increaseCounter } from '../controller/blog.controller'

const router = Router();

// simpleUser
router.post('/blog', createBlog)
router.patch('/blog/:id/liked', likeBlog)
router.get('/blog', getBlogs)
router.get('/blog/:id', getBlog)
router.get('/blog/:authorId/byauthor', getBlogsByAuthor)
router.delete('/blog/:id', deleteBlog)
router.put('/blog/:id', updateBlog)
router.patch('/blog/:id/recover', recoverBlog)

// admin

router.delete('/blog/:id/final', actuallyDeleteBlog)

// dev

router.patch('/blog/:id/counter', increaseCounter)

export default router