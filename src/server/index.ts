import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/user.routes'
import blogRoutes from '../routes/blog.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from '../documentation/swaggerOptions'
import cookieParser from 'cookie-parser'

export const app = express()

const corsOptions = {
    // set origin to a specific origin.
    origin: 'http://localhost:5173',

    // or, set origin to true to reflect the request origin
    //origin: true,

    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use('/api', userRoutes)
app.use('/api', blogRoutes)
const specs = swaggerJsDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))


app.listen(3000)
console.log('Server on port', 3000)

