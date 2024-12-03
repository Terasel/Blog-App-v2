import { Router } from "express"
import * as blogServices from '../controller/blog.controller'

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   BlogCreate:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      description: The blog's title
 *     content:
 *      type: string
 *      description: The blog's content (optional)
 *    required:
 *     - title
 *    example:
 *     title: Somewhere over the rainbow
 *     content: The sky's blue
 *   BlogCreate2:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The blog's id
 *     title:
 *      type: string
 *      description: The blog's title
 *     content:
 *      type: string
 *      description: The blog's content (optional)
 *     createdAt:
 *      type: string
 *      description: The time the blog was created at
 *     updatedAt:
 *      type: string
 *      description: The time the blog was last updated at
 *     likeCounter:
 *      type: integer
 *      description: The amount of likes a blog has
 *     deleted:
 *      type: boolean
 *      desription: The blog's deleted status
 *     popularity:
 *      type: string
 *      description: The blog's popularity
 *     authorId:
 *      type: integer
 *      description: The blog's author's id
 *    example:
 *     id: 205
 *     title: The last time I ate pie
 *     content: It was delicious
 *     createdAt: 2024-10-24T09:11:07.989Z
 *     updatedAt: 2024-10-24T09:11:07.989Z
 *     likeCounter: 0
 *     deleted: false
 *     popularity: 50%
 *     authorId: 30
 *   Blog:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The blog's id
 *     title:
 *      type: string
 *      description: The blog's title
 *     content:
 *      type: string
 *      description: The blog's content (optional)
 *     createdAt:
 *      type: string
 *      description: The time the blog was created at
 *     updatedAt:
 *      type: string
 *      description: The time the blog was last updated at
 *     authorId:
 *      type: integer
 *      description: The blog's author's id
 *     author:
 *      type: string
 *      description: The blog's author's name
 *     popularity:
 *      type: string
 *      description: The blog's popularity
 *    required:
 *     - title
 *     - authorId
 *    example:
 *     id: 205
 *     title: The last time I ate pie
 *     content: It was delicious
 *     createdAt: 2024-10-24T09:11:07.989Z
 *     updatedAt: 2024-10-24T09:11:07.989Z
 *     popularity: 50%
 *     authorId: 30
 *     author: {
 *      "name": "Tiny Tim22"
 *     }
 *  parameters:
 *   blogId:
 *    in: path
 *    name: id
 *    required: true
 *    schema:
 *     type: integer
 *    description: The blog's id
 *   authorId:
 *    in: path
 *    name: authorId
 *    required: true
 *    schema:
 *     type: integer
 */

/**
 * @swagger
 * tags:
 *  - name: Blogs simpleUser
 *    description: simpleUser blog endpoints
 *  - name: Blogs admin
 *    description: admin blog endpoints
 *  - name: Blogs dev
 *    description: Blog endpoints for development/testing purposes
 */

// simpleUser

/**
 * @swagger
 * /api/blog:
 *  post:
 *   summary: Create a new blog
 *   tags: [Blogs simpleUser]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BlogCreate'
 *   responses:
 *    201:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/BlogCreate2'
 *    400:
 *     description: There is no cookie or token/This title is invalid/This content is invalid/No Author ID is being sent
 *    422:
 *     description: This blog could not be created
 */

router.post('/blog', blogServices.createBlog)

/**
 * @swagger
 * /api/blog/{id}/liked:
 *  patch:
 *   summary: Like a blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    200:
 *     description: The blog was liked correctly
 *    400:
 *     description: There is no cookie or token/No Author ID is being sent on author verification/No ID is being sent on blog verification/
 *                  A user cannot like their own post/No ID is being sent on like request/No Author ID is being sent on like request/
 *                  The like already exists/The like could not be counted properly/The popularity could not be calculated
 *    404:
 *     description: The user does not exist/The blog does not exist
 *    422:
 *     description: The like could not be created
 */

router.patch('/blog/:id/liked', blogServices.likeBlog)

/**
 * @swagger
 * /api/blog/{id}/disliked:
 *  patch:
 *   summary: Dislike a blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    204:
 *     description: The blog was disliked correctly
 *    400:
 *     description: There is no cookie or token/No Author ID is being sent on author verification/No ID is being sent on blog verification/
 *                  No ID is being sent on like request/No Author ID is being sent on like request/The like does not exist/The like could not be reverted/
 *                  The dislike could not be counted properly/The popularity could not be calculated
 *    404:
 *     description: The user does not exist/The blog does not exist
 */

router.patch('/blog/:id/disliked', blogServices.dislikeBlog)

/**
 * @swagger
 * /api/blog:
 *  get:
 *   summary: Return a blog list, ordered by creation date (most recent on top)
 *   tags: [Blogs simpleUser]
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Blog'
 *    400:
 *     description: There is no cookie or token
 *    404:
 *     description: No blogs could be found
 */

router.get('/blog', blogServices.getBlogs)

/**
 * @swagger
 * /api/blog/{id}:
 *  get:
 *   summary: Get a specific blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    400:
 *     description: No ID is being sent
 *    404:
 *     description: This blog could not be found
 */

router.get('/blog/:id', blogServices.getBlog)

/**
 * @swagger
 * /api/myblogs:
 *  get:
 *   summary: Get all blogs from a specific author (thas is logged in)
 *   tags: [Blogs simpleUser]
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/BlogCreate2'
 *    400:
 *     description: There is no cookie or token/No Author ID is being sent
 *    404:
 *     description: This user does not exist/No blogs from this author could be found
 */

router.get('/myblogs', blogServices.getBlogsByAuthor)

/**
 * @swagger
 * /api/blog/{id}/delete:
 *  patch:
 *   summary: Soft delete a blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    204:
 *     description: The blog was deleted correctly
 *    400:
 *     description: There is no cookie or token/No Author ID is being sent/No ID is being sent/This blog could not be deleted
 *    401:
 *     description: A user can only delete their own posts
 *    404:
 *     description: The blog does not exist
 */

router.patch('/blog/:id/delete', blogServices.deleteBlog)

/**
 * @swagger
 * /api/blog/{id}/recover:
 *  patch:
 *   summary: Recover a blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/BlogCreate2'
 *    400:
 *     description: There is no cookie or token/No Author ID is being sent/No ID is being sent/This blog could not be recovered
 *    401:
 *     description: A user can only recover their own posts
 *    404:
 *     description: The blog does not exist
 */

router.patch('/blog/:id/recover', blogServices.recoverBlog)

/**
 * @swagger
 * /api/blog/{id}:
 *  put:
 *   summary: Update a blog's data
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BlogCreate'
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/BlogCreate2'
 *    400:
 *     description: No ID is being sent/This title is invalid/This content is invalid/This blog could not be updated
 *    404:
 *     description: This blog could not be found
 */

router.put('/blog/:id', blogServices.updateBlog)

/**
 * @swagger
 * /api/blog/{id}/popularity:
 *  patch:
 *    summary: Update a specific blog's popularity score
 *    tags: [Blogs simpleUser]
 *    parameters:
 *      - $ref: '#/components/parameters/blogId'
 *    responses:
 *      200:
 *        description: Popularity updated
 *      400:
 *        description: No ID is being sent/This blog's popularity could not be updated
 *      404:
 *       description: This blog could not be found
 */

router.patch('/blog/:id/popularity', blogServices.popularityScore)

// admin


/**
 * @swagger
 * /api/blog/{id}/final:
 *  delete:
 *   summary: Irreversibly delete a specific blog
 *   tags: [Blogs admin]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    204:
 *     description: The blog was completely deleted correctly
 *    400:
 *     description: There is no cookie or token/No ID is being sent/The likes from this blog could not be completely deleted/This blog could not be completely deleted
 *    401:
 *     description: The user does not have the necessary access level
 */

router.delete('/blog/:id/final', blogServices.actuallyDeleteBlog)

// dev

/**
 * @swagger
 * /api/blog:
 *  delete:
 *   summary: Delete all blogs in the database
 *   tags: [Blogs dev]
 *   responses:
 *    204:
 *     description: The blogs were deleted correctly
 *    400:
 *     description: The blogs could not be deleted
 */

router.delete('/blog', blogServices.deleteAllBlogs)

/**
 * @swagger
 * /api/likes:
 *  delete:
 *   summary: Delete all likes in the database
 *   tags: [Blogs dev]
 *   responses:
 *    204:
 *     description: The likes were deleted correctly
 *    400:
 *     description: The likes could not be deleted
 */

router.delete('/likes', blogServices.deleteAllLikes)

export default router