import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/user.routes'
import blogRoutes from '../routes/blog.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from '../documentation/swaggerOptions'

export const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', blogRoutes)
const specs = swaggerJsDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.listen(3000)
console.log('Server on port', 3000)

