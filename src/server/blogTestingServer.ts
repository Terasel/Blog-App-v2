import express from 'express'

import userController from '../routes/user.routes'
import blogController from '../routes/blog.routes'

export const appBlog = express()

appBlog.use(express.json())

appBlog.use('/api', userController);
appBlog.use('/api', blogController);

export const blogServer = appBlog.listen(3020)
console.log('Server on port', 3020)