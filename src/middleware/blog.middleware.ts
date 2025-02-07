import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface blogFind {
    id: string
}

interface JwtPayload {
    id: number,
    name: string,
    email: string,
    role: string
}

interface authorFind {
    authorId: number
}

interface createInterface {
    title: string,
    content: string,
    authorId: number,
    popularity: string
}

interface likeCreate {
    blogId: number,
    userId: number
}

interface blogUpdate {
    title: string,
    content: string
}

export const BlogIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqFind: blogFind = { id: req.params.id }
        if (reqFind.id == null) throw 'No ID'
        next()
    } catch (err) {
        if (err == 'No ID') res.status(400).send('No ID is being sent')
    }
}

export const AuthorIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqFind: authorFind = { authorId: decoded.id }
        if (reqFind.authorId == null) throw 'No Author ID'
        next()
    } catch (err) {
        if (err == 'No Author ID') res.status(400).send('No Author ID is being sent')
    }
}

export const CreateBlogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqCreate: createInterface = { title: req.body.title, content: req.body.content || '', authorId: decoded.id, popularity: '0%' }
        if (typeof reqCreate.title != 'string') throw 'Invalid title'
        if (typeof reqCreate.content != 'string') throw 'Invalid content'
        if (reqCreate.authorId == null) throw 'No Author ID'
        next()
    } catch (err) {
        if (err == 'Invalid title') res.status(400).send('This title is invalid')
        if (err == 'Invalid content') res.status(400).send('This content is invalid')
        if (err == 'No Author ID') res.status(400).send('No Author ID is being sent')
    }
}

export const LikeBlogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const userFind: authorFind = { authorId: decoded.id }
        if (userFind.authorId == null) throw 'No Author ID ver'
        const blogFind: blogFind = { id: req.params.id }
        if (blogFind.id == null) throw 'No ID ver'
        const reqFind: likeCreate = { blogId: +req.params.id, userId: decoded.id }
        if (reqFind.blogId == null) throw 'No ID like'
        if (reqFind.userId == null) throw 'No Author ID like'
        next()
    } catch (err) {
        if (err == 'No Author ID ver') res.status(400).send('No Author ID is being sent on author verification')
        if (err == 'No ID ver') res.status(400).send('No ID is being sent on blog verification')
        if (err == 'No ID like') res.status(400).send('No ID is being sent on like request')
        if (err == 'No Author ID like') res.status(400).send('No Author ID is being sent on like request')
    }
}

export const UpdateBlogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqUpdate: blogUpdate = { title: req.body.title, content: req.body.content }
        if (typeof reqUpdate.title != 'string') throw 'Invalid title'
        if (typeof reqUpdate.content != 'string') throw 'Invalid content'
        next()
    } catch (err) {
        if (err == 'Invalid title') res.status(400).send('This title is invalid')
        if (err == 'Invalid content') res.status(400).send('This content is invalid')
    }
}