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
 *     - role
 *    example:
 *     id: 414
 *     email: neverwannagiveyouup@gmail.com
 *     name: Rick Astley
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
 *  name: Users
 *  description: User endpoints
 */

// simpleUser

/**
 * @swagger
 * /api/users:
 *  post:
 *   summary: Create a new User
 *   tags: [Users]
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
 *     description: The User was not created
 */

router.post('/users', userServices.createUser)
router.put('/users/:id', userServices.updateUser)

//admin

/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: Return a User list
 *   tags: [Users]
 *   responses:
 *    200:
 *     description: The user list
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */

router.get('/users', userServices.getUsers)
router.patch('/users/:id/ban', userServices.banUser)

//dev

router.delete('/users', userServices.deleteAllUsers)

export default router;