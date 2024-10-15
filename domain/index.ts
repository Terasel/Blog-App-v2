import express from 'express'

import userController from '../routes/user.routes'
import blogController from '../routes/blog.routes'

export const app = express()

app.use(express.json())

app.use('/api', userController);
app.use('/api', blogController);

app.listen(3000)
console.log('Server on port', 3000)

