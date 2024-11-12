import { Router } from "express"
import * as userServices from '../controller/user.controller'

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
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
 *     email: nevergonnagiveyouup@gmail.com
 *     name: Rick Astley
 *     password: youjustgotrickrolled
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
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: User succesfully created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
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
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: The updated user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: This user could not be updated
 */

router.put('/users/:id', userServices.updateUser)

//admin

/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: Return a user list
 *   tags: [Users admin]
 *   responses:
 *    200:
 *     description: The user list
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 *    404:
 *     description: No users could be found 
 */

router.get('/users', userServices.getUsers)

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
 *     description: The banned user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: This user could not be banned
 */

router.patch('/users/:id/ban', userServices.banUser)

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
 *     description: The unbanned user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: This user could not be unbanned
 */

router.patch('/users/:id/unban', userServices.unbanUser)

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
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: User succesfully logged in
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    422:
 *     description: The password is incorrect
 */

router.post('/login', userServices.loginUser)

//dev


/**
 * @swagger
 * /api/users:
 *  delete:
 *   summary: Delete all users in the database
 *   tags: [Users dev]
 *   responses:
 *    204:
 *     description: The users were deleted
 *    400:
 *     description: The users could not be deleted
 */

router.delete('/users', userServices.deleteAllUsers)

export default router;