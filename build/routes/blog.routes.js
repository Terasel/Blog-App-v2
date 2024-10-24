"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogServices = __importStar(require("../controller/blog.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *  schemas:
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
 *     liked:
 *      type: boolean
 *      description: The blog's liked status
 *     likeCounter:
 *      type: integer
 *      description: The blog's like counter
 *     deleted:
 *      type: boolean
 *      description: The blog's deleted status
 *     authorId:
 *      type: integer
 *      description: The blog's author's id
 *    required:
 *     - title
 *     - authorId
 *    example:
 *     id: 205
 *     title: The last time I ate pie
 *     content: It was delicious
 *     createdAt: 2024-10-24T09:11:07.989Z
 *     updatedAt: 2024-10-24T09:11:07.989Z
 *     liked: false
 *     likeCounter: 0
 *     deleted: false
 *     authorId: 30
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
 *       $ref: '#/components/schemas/Blog'
 *   responses:
 *    201:
 *     description: Blog succesfully created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    422:
 *     description: This blog could not be created
 */
router.post('/blog', blogServices.createBlog);
/**
 * @swagger
 * /api/blog/{id}/liked:
 *  patch:
 *   summary: Like/dislike a blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    200:
 *     description: The liked/disliked blog
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    400:
 *     description: This blog's liked status could not be updated
 */
router.patch('/blog/:id/liked', blogServices.likeBlog);
/**
 * @swagger
 * /api/blog:
 *  get:
 *   summary: Return a blog list, ordered by creation date (most recent on top)
 *   tags: [Blogs simpleUser]
 *   responses:
 *    200:
 *     description: The blog list, ordered by creation date (most recent on top)
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Blog'
 *    404:
 *     description: No blogs could be found
 */
router.get('/blog', blogServices.getBlogs);
/**
 * @swagger
 * /api/blog/{id}:
 *  get:
 *    summary: Get a specific blog
 *    tags: [Blogs simpleUser]
 *    parameters:
 *      - $ref: '#/components/parameters/blogId'
 *    responses:
 *      200:
 *        description: The requested blog
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Blog'
 *      404:
 *        description: This blog could not be found
 */
router.get('/blog/:id', blogServices.getBlog);
/**
 * @swagger
 * /api/blog/{authorId}/byauthor:
 *  get:
 *    summary: Get all blogs from a specific author
 *    tags: [Blogs simpleUser]
 *    parameters:
 *      - $ref: '#/components/parameters/authorId'
 *    responses:
 *      200:
 *        description: The requested blogs
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Blog'
 *      404:
 *        description: No blogs from this author could be found
 */
router.get('/blog/:authorId/byauthor', blogServices.getBlogsByAuthor);
/**
 * @swagger
 * /api/blog/{id}:
 *  patch:
 *   summary: Soft delete a blog
 *   tags: [Blogs simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    204:
 *     description: The deleted blog
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    400:
 *     description: This blog could not be deleted
 */
router.patch('/blog/:id', blogServices.deleteBlog);
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
 *     description: The recovered blog
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    400:
 *     description: This blog could not be recovered
 */
router.patch('/blog/:id/recover', blogServices.recoverBlog);
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
 *       $ref: '#/components/schemas/Blog'
 *   responses:
 *    200:
 *     description: The updated blog
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    400:
 *     description: This blog could not be updated
 */
router.put('/blog/:id', blogServices.updateBlog);
/**
 * @swagger
 * /api/blog/{id}/popularity:
 *  get:
 *    summary: Get a specific blog's popularity score
 *    tags: [Blogs simpleUser]
 *    parameters:
 *      - $ref: '#/components/parameters/blogId'
 *    responses:
 *      200:
 *        description: The requested blog's popularity score
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Blog'
 *      404:
 *        description: This blog could not be found
 */
router.get('/blog/:id/popularity', blogServices.popularityScore);
// admin
/**
 * @swagger
 * /api/blog/{id}/final:
 *  delete:
 *    summary: Irreversibly delete a specific blog
 *    tags: [Blogs admin]
 *    parameters:
 *      - $ref: '#/components/parameters/blogId'
 *    responses:
 *      204:
 *        description: The blog was deleted
 *      400:
 *        description: This blog could not be completely deleted
 */
router.delete('/blog/:id/final', blogServices.actuallyDeleteBlog);
// dev
/**
 * @swagger
 * /api/blog/{id}/counter:
 *  patch:
 *   summary: Increase a blog's like counter
 *   tags: [Blogs dev]
 *   parameters:
 *    - $ref: '#/components/parameters/blogId'
 *   responses:
 *    200:
 *     description: The blog with the increased like counter
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Blog'
 *    400:
 *     description: This blog's like counter could not be increased
 */
router.patch('/blog/:id/counter', blogServices.increaseCounter);
/**
 * @swagger
 * /api/blog:
 *  delete:
 *   summary: Delete all blogs in the database
 *   tags: [Blogs dev]
 *   responses:
 *    204:
 *     description: The blogs were deleted
 *    400:
 *     description: The blogs could not be deleted
 */
router.delete('/blog', blogServices.deleteAllBlogs);
router.get('/blog/testing', blogServices.testing);
exports.default = router;
