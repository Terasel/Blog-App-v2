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
const userServices = __importStar(require("../controller/user.controller"));
const router = (0, express_1.Router)();
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
 *     email: nevergonnagiveyouup@gmail.com
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
router.post('/users', userServices.createUser);
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
router.put('/users/:id', userServices.updateUser);
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
router.get('/users', userServices.getUsers);
/**
 * @swagger
 * /api/users/{id}/ban:
 *  patch:
 *   summary: Ban/unban a user
 *   tags: [Users admin]
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   responses:
 *    200:
 *     description: The banned/unbanned user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: This user could not be banned/unbanned
 */
router.patch('/users/:id/ban', userServices.banUser);
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
router.delete('/users', userServices.deleteAllUsers);
exports.default = router;
