import { Router } from "express"
import * as userServices from '../controller/user.controller'

const router = Router();

// simpleUser
router.post('/users', userServices.createUser)
router.put('/users/:id', userServices.updateUser)

//admin

router.get('/users', userServices.getUsers)
router.patch('/users/:id/ban', userServices.banUser)

//dev

router.delete('/users', userServices.deleteAllUsers)

export default router;