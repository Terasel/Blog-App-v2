import { Router } from "express"
import * as blogServices from '../controller/blog.controller'
const router = Router();

// simpleUser
router.post('/blog', blogServices.createBlog)
router.patch('/blog/:id/liked', blogServices.likeBlog)
router.get('/blog', blogServices.getBlogs)
router.get('/blog/:id', blogServices.getBlog)
router.get('/blog/:authorId/byauthor', blogServices.getBlogsByAuthor)
router.patch('/blog/:id', blogServices.deleteBlog)
router.patch('/blog/:id/recover', blogServices.recoverBlog)
router.put('/blog/:id', blogServices.updateBlog)
router.get('/blog/:id/popularity', blogServices.popularityScore)

// admin

router.delete('/blog/:id/final', blogServices.actuallyDeleteBlog)

// dev

router.patch('/blog/:id/counter', blogServices.increaseCounter)
router.delete('/blog', blogServices.deleteAllBlogs)
router.get('/blog/testing', blogServices.testing)

export default router