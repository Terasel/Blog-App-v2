import { Router } from "express"
import * as userServices from '../controller/user.controller'
import { TokenMiddleware } from "../middleware/user.middleware"
import { RoleMiddleware } from "../middleware/user.middleware"

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   UserBanned:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The user's id
 *     email:
 *      type: string
 *      description: The user's email address
 *     name:
 *      type: string
 *      description: The user's name
 *     password:
 *      type: string
 *      description: The user's password (saved in encrpyted form)
 *     bio:
 *      type: string
 *      description: The user's bio (optional)
 *     role:
 *      type: string
 *      description: The user's role
 *     banned:
 *      type: boolean
 *      description: The user's banned status
 *    required:
 *     - email
 *     - name
 *     - password
 *     - role
 *    example:
 *     id: 414
 *     email: livininthesunshine39@hotmail.com
 *     name: Tiny Tim22
 *     password: $2b$10$OfDKCoapu9ZIomJy9XDR2.TimbhAa8RrETzDgCSHn6.R3SGWaShh6
 *     bio: We've known each other for so long
 *     role: admin
 *     banned: true
 *   UserUpdate:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: The user's email address
 *     name:
 *      type: string
 *      description: The user's name
 *    example:
 *     email: liviinthesunshine39@hotmail.com
 *     name: Tiny Tim22
 *   UserLogin:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: The user's email address
 *     password:
 *      type: string
 *      description: The user's password (saved in encrpyted form)
 *    required:
 *     - email
 *     - password
 *    example:
 *     email: livininthesunshine39@hotmail.com
 *     password: toodles22
 *   UserCreate:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: The user's email address
 *     name:
 *      type: string
 *      description: The user's name
 *     password:
 *      type: string
 *      description: The user's password (saved in encrpyted form)
 *     role:
 *      type: string
 *      description: The user's role
 *    required:
 *     - email
 *     - name
 *     - password
 *     - role
 *    example:
 *     email: livininthesunshine39@hotmail.com
 *     name: Tiny Tim22
 *     password: toodles22
 *     role: admin
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The user's id
 *     email:
 *      type: string
 *      description: The user's email address
 *     name:
 *      type: string
 *      description: The user's name
 *     password:
 *      type: string
 *      description: The user's password (saved in encrpyted form)
 *     bio:
 *      type: string
 *      description: The user's bio (optional)
 *     role:
 *      type: string
 *      description: The user's role
 *     banned:
 *      type: boolean
 *      description: The user's banned status
 *    required:
 *     - email
 *     - name
 *     - password
 *     - role
 *    example:
 *     id: 414
 *     email: livininthesunshine39@hotmail.com
 *     name: Tiny Tim22
 *     password: $2b$10$OfDKCoapu9ZIomJy9XDR2.TimbhAa8RrETzDgCSHn6.R3SGWaShh6
 *     bio: We've known each other for so long
 *     role: admin
 *     banned: false
 *  parameters:
 *   userId:
 *    in: path
 *    name: id
 *    required: true
 *    schema:
 *     type: integer
 *    description: The user's id
 */

/**
 * @swagger
 * tags:
 *   - name: Users simpleUser
 *     description: simpleUser user endpoints
 *   - name: Users admin
 *     description: admin user endpoints
 *   - name: Users dev
 *     description: User endpoints for development/testing purposes
 */

// simpleUser

/**
 * @swagger
 * /api/users:
 *  post:
 *   summary: Create a new user
 *   tags: [Users simpleUser]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserCreate'
 *   responses:
 *    201:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: This email/user name/password/user role is invalid
 *    422:
 *     description: This user could not be created
 */

router.post('/users', userServices.createUser)

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *   summary: Update a user's data
 *   tags: [Users simpleUser]
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserUpdate'
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: There is no cookie or token/No ID is being sent/This email/user name is invalid/This user could not be updated  
 *    404:
 *     description: This user could not be found
 */

router.put('/users/:id', TokenMiddleware, userServices.updateUser)

//admin

/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: Return a user list
 *   tags: [Users admin]
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 *    400:
 *     description: There is no cookie or token
 *    401:
 *     description: The user does not have the necessary access level
 *    404:
 *     description: No users could be found 
 */

router.get('/users', TokenMiddleware, RoleMiddleware, userServices.getUsers)

/**
 * @swagger
 * /api/users/{id}/ban:
 *  patch:
 *   summary: Ban a user
 *   tags: [Users admin]
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserBan'
 *    400:
 *     description: There is no cookie or token/No ID is being sent/This user is already banned/This user could not be banned
 *    401:
 *     description: The user does not have the necessary access level
 *    404:
 *     description: This user could not be found
 */

router.patch('/users/:id/ban', TokenMiddleware, RoleMiddleware, userServices.banUser)

/**
 * @swagger
 * /api/users/{id}/unban:
 *  patch:
 *   summary: Unban a user
 *   tags: [Users admin]
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: There is no cookie or token/No ID is being sent/This user is not banned/This user could not be unbanned
 *    401:
 *     description: The user does not have the necessary access level
 *    404:
 *     description: This user could not be found
 */

router.patch('/users/:id/unban', TokenMiddleware, RoleMiddleware, userServices.unbanUser)

//login

/**
 * @swagger
 * /api/login:
 *  post:
 *   summary: Login a user
 *   tags: [Users simpleUser]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserLogin'
 *   responses:
 *    200:
 *     description: User succesfully logged in
 *    400:
 *     description: This email is invalid/This password is invalid/The password is incorrect/The token has not been created
 *    401:
 *     description: This user is currently banned
 */

router.post('/login', userServices.loginUser)

/**
 * @swagger
 * /api/logout:
 *  post:
 *   summary: Logout a user
 *   tags: [Users simpleUser]
 *   responses:
 *    200:
 *     description: Logout successful
 */

router.post('/logout', userServices.logoutUser)

//dev


/**
 * @swagger
 * /api/users:
 *  delete:
 *   summary: Delete all users in the database
 *   tags: [Users dev]
 *   responses:
 *    204:
 *     description: The users were deleted correctly
 *    400:
 *     description: The users could not be deleted
 */

router.delete('/users', userServices.deleteAllUsers)

export default router;