import { Router } from "express";
import { createUser, updateUser, getUsers, banUser } from '../controller/user.controller'

const router = Router();

// simpleUser
router.post('/users', createUser)
router.put('/users/:id', updateUser)

//admin

router.get('/users', getUsers)
router.patch('/users/:id/ban', banUser)

export default router;