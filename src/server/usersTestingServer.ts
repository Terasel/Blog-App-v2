import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/user.routes'
import blogRoutes from '../routes/blog.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from '../documentation/swaggerOptions'
import cookieParser from 'cookie-parser'

export const appUsers = express()

const corsOptions = {
    // set origin to a specific origin.
    origin: 'http://localhost:5173',

    // or, set origin to true to reflect the request origin
    //origin: true,

    credentials: true,
    optionsSuccessStatus: 200,
};

appUsers.use(cors(corsOptions));
appUsers.use(express.json())
appUsers.use(cookieParser())
appUsers.use('/api', userRoutes);
appUsers.use('/api', blogRoutes);
const specs = swaggerJsDoc(options)
appUsers.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export const userServer = appUsers.listen(3010)
console.log('Server on port', 3010)