import express from 'express'

import userController from '../routes/user.routes'
import blogController from '../routes/blog.routes'

export const appUsers = express()

appUsers.use(express.json())

appUsers.use('/api', userController);
appUsers.use('/api', blogController);

export const userServer = appUsers.listen(3010)
console.log('Server on port', 3010)