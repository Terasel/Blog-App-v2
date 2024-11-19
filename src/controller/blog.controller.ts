import { Handler } from 'express'
import { blogModel } from '../models/blog'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: number,
    name: string,
    email: string,
    role: string
}

interface createInterface {
    title: string,
    content: string,
    authorId: number
}

export const createBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqCreate: createInterface = { title: req.body.title, content: req.body.content || '', authorId: req.body.authorId || decoded.id }
        const newBlog = await blogModel.createBlog(reqCreate)
        if (!newBlog) throw 'Not created'
        res.status(201).send(newBlog)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This blog could not be created')
    }
}

export const likeBlog: Handler = async (req, res) => {
    try {
        try {
            const token = req.cookies.access_token
            const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
            const reqFind = {
                id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id,
                liked: req.body.liked, likeCounter: req.body.likeCounter, deleted: req.body.deleted, createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
            }
            const blogLike = await blogModel.likeBlog(reqFind)
            if (!blogLike) throw 'Empty'
            res.status(200).send(blogLike);
        } catch {
            const token = req.cookies.access_token
            const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
            const reqFind = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
            const blogLike = await blogModel.dislikeBlog(reqFind)
            if (!blogLike) throw 'Empty'
            res.status(200).send(blogLike);
        }
    } catch (err) {
        if (err = 'Empty') res.status(400).send("This blog's liked status could not be updated");
    }
}

export const getBlogs: Handler = async (req, res) => {
    try {
        const blogs = await blogModel.getBlogs()
        if (!blogs) throw 'Empty'
        res.status(200).send(blogs)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('No blogs could be found')
    }
}

export const getBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqFind = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const specificBlog = await blogModel.getBlog(reqFind)
        if (!specificBlog) throw 'Empty'
        res.status(200).send(specificBlog)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This blog could not be found')
    }
}

export const getBlogsByAuthor: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqFind = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const user = await blogModel.getAuthor(reqFind)
        if (!user) throw 'No user'
        const authorBlogs = await blogModel.getBlogsByAuthor(reqFind)
        if (!authorBlogs) throw 'Empty'
        res.status(200).send(authorBlogs)
    } catch (err) {
        if (err = 'No user') res.status(404).send('This user does not exist')
        else if (err = 'Empty') res.status(404).send('No blogs from this author could be found')
    }
}

export const deleteBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqDelete = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const blogDelete = await blogModel.deleteBlog(reqDelete)
        if (!blogDelete) throw 'Empty'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be deleted')
    }
}

export const recoverBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqRecover = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const blogRecover = await blogModel.recoverBlog(reqRecover)
        if (!blogRecover) throw 'Empty'
        res.status(200).send(blogRecover)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be recovered')
    }
}

export const updateBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqUpdate = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const blog = await blogModel.getBlog(reqUpdate)
        if (!blog) throw 'No blog'
        const blogUpdate = await blogModel.updateBlog(reqUpdate)
        if (!blogUpdate) throw 'Empty'
        res.status(200).send(blogUpdate)
    } catch (err) {
        if (err = 'No blog') res.status(404).send('This blog could not be found')
        else if (err = 'Empty') res.status(400).send('This blog could not be updated')
    }
}

export const actuallyDeleteBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqDelete = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const blogFinalDelete = await blogModel.actuallyDeleteBlog(reqDelete)
        if (!blogFinalDelete) throw 'Undeletable'
        res.status(204).send(blogFinalDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('This blog could not be completely deleted')
    }
}

export const popularityScore: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqFind = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const popularity = await blogModel.popularityScore(reqFind)
        if (!popularity) throw 'No popularity score'
        res.status(200).send(popularity + '%')
    } catch (err) {
        if (err = 'No popularity score') res.status(400).send("This blog's popularity score could not be displayed")
    }
}
// - - - - - - - -
export const increaseCounter: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqFind = { id: req.body.id, title: req.body.title, content: req.body.content, authorId: decoded.id }
        const blogCounter = await blogModel.increaseCounter(reqFind)
        if (!blogCounter) throw 'Empty'
        res.status(200).send(blogCounter)
    } catch (err) {
        if (err = 'Empty') res.status(400).send("This blog's like counter could not be increased")
    }
}

export const deleteAllBlogs: Handler = async (req, res) => {
    try {
        const blogDelete = await blogModel.deleteAllBlogs()
        if (!blogDelete) throw 'Undeletable'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The blogs could not be deleted')
    }
}

export const testing: Handler = async (req, res) => {
    try {
        const users = await blogModel.testing()
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send('The testing did not work')
    }
}
