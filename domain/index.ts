import express from 'express'

import userController from '../controller/user.controller'
import blogController from '../controller/blog.controller'

export const app = express()

app.use(express.json())

app.use('/api', userController);
app.use('/api', blogController);

app.listen(3000)
console.log('Server on port', 3000)

