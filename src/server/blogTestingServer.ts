import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/user.routes'
import blogRoutes from '../routes/blog.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from '../documentation/swaggerOptions'
import cookieParser from 'cookie-parser'

export const appBlog = express()

const corsOptions = {
    // set origin to a specific origin.
    origin: 'http://localhost:5173',

    // or, set origin to true to reflect the request origin
    //origin: true,

    credentials: true,
    optionsSuccessStatus: 200,
};

appBlog.use(cors(corsOptions));
appBlog.use(express.json())
appBlog.use(cookieParser())
appBlog.use('/api', userRoutes);
appBlog.use('/api', blogRoutes);
const specs = swaggerJsDoc(options)
appBlog.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export const blogServer = appBlog.listen(3020)
console.log('Server on port', 3020)