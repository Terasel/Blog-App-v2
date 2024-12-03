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
    authorId: number,
    popularity: string
}

interface blogFind {
    id: string
}

interface authorFind {
    authorId: number
}

interface blogUpdate {
    title: string,
    content: string
}

interface likeCreate {
    blogId: number,
    userId: number
}

export const createBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqCreate: createInterface = { title: req.body.title, content: req.body.content || '', authorId: decoded.id, popularity: '0%' }
        if (typeof reqCreate.title != 'string') throw 'Invalid title'
        if (typeof reqCreate.content != 'string') throw 'Invalid content'
        if (reqCreate.authorId == null) throw 'No Author ID'
        const newBlog = await blogModel.createBlog(reqCreate)
        if (!newBlog) throw 'Not created'
        res.status(201).send(newBlog)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'Invalid title') res.status(400).send('This title is invalid')
        if (err == 'Invalid content') res.status(400).send('This content is invalid')
        if (err == 'No Author ID') res.status(400).send('No Author ID is being sent')
        if (err == 'Not created') res.status(422).send('This blog could not be created')
    }
}

export const likeBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const userFind: authorFind = { authorId: decoded.id }
        if (userFind.authorId == null) throw 'No Author ID ver'
        const user = await blogModel.getAuthor(userFind)
        if (!user) throw 'No user'
        const blogFind: blogFind = { id: req.params.id }
        if (blogFind.id == null) throw 'No ID ver'
        const specificBlog = await blogModel.getBlog(blogFind)
        if (!specificBlog) throw 'No blog'
        if (specificBlog.authorId == userFind.authorId) throw 'Same user'
        const reqFind: likeCreate = { blogId: +req.params.id, userId: decoded.id }
        if (reqFind.blogId == null) throw 'No ID like'
        if (reqFind.userId == null) throw 'No Author ID like'
        const findLike = await blogModel.getLike(reqFind)
        if (findLike) throw 'Existing like'
        const createLike = await blogModel.likeBlog(reqFind)
        if (!createLike) throw 'Unlikable'
        const blogCounter = await blogModel.increaseCounter(blogFind)
        if (!blogCounter) throw 'Counter not increased'
        const popUpdate = await blogModel.popularityScore(blogFind)
        if (!popUpdate) throw 'Popularity not calculated'
        res.status(200).send('The blog was liked correctly')
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'No Author ID ver') res.status(400).send('No Author ID is being sent on author verification')
        if (err == 'No user') res.status(404).send('The user does not exist')
        if (err == 'No ID ver') res.status(400).send('No ID is being sent on blog verification')
        if (err == 'No blog') res.status(404).send('The blog does not exist')
        if (err == 'Same user') res.status(400).send('A user cannot like their own post')
        if (err == 'No ID like') res.status(400).send('No ID is being sent on like request')
        if (err == 'No Author ID like') res.status(400).send('No Author ID is being sent on like request')
        if (err == 'Existing like') res.status(400).send('The like already exists')
        if (err == 'Unlikable') res.status(422).send('The like could not be created')
        if (err == 'Counter not increased') res.status(400).send('The like could not be counted properly')
        if (err == 'Popularity not calculated') res.status(400).send('The popularity could not be calculated')
    }
}

export const dislikeBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const userFind: authorFind = { authorId: decoded.id }
        if (userFind.authorId == null) throw 'No Author ID ver'
        const user = await blogModel.getAuthor(userFind)
        if (!user) throw 'No user'
        const blogFind: blogFind = { id: req.params.id }
        if (blogFind.id == null) throw 'No ID ver'
        const specificBlog = await blogModel.getBlog(blogFind)
        if (!specificBlog) throw 'No blog'
        const reqFind: likeCreate = { blogId: +req.params.id, userId: decoded.id }
        if (reqFind.blogId == null) throw 'No ID like'
        if (reqFind.userId == null) throw 'No Author ID like'
        const findLike = await blogModel.getLike(reqFind)
        if (!findLike) throw 'Non-existing like'
        const createDislike = await blogModel.dislikeBlog(reqFind)
        if (!createDislike) throw 'Undislikable'
        const blogCounter = await blogModel.decreaseCounter(blogFind)
        if (!blogCounter) throw 'Counter not decreased'
        const popUpdate = await blogModel.popularityScore(blogFind)
        if (!popUpdate) throw 'Popularity not calculated'
        res.status(204).send('The blog was disliked correctly')
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'No Author ID ver') res.status(400).send('No Author ID is being sent on author verification')
        if (err == 'No user') res.status(404).send('The user does not exist')
        if (err == 'No ID ver') res.status(400).send('No ID is being sent on blog verification')
        if (err == 'No blog') res.status(404).send('The blog does not exist')
        if (err == 'No ID like') res.status(400).send('No ID is being sent on like request')
        if (err == 'No Author ID like') res.status(400).send('No Author ID is being sent on like request')
        if (err == 'Non-existing like') res.status(400).send('The like does not exist')
        if (err == 'Undislikable') res.status(400).send('The like could not be reverted')
        if (err == 'Counter not decreased') res.status(400).send('The dislike could not be counted properly')
        if (err == 'Popularity not calculated') res.status(400).send('The popularity could not be calculated')
    }
}

export const getBlogs: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const blogs = await blogModel.getBlogs()
        if (!blogs) throw 'Empty'
        res.status(200).send(blogs)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'Empty') res.status(404).send('No blogs could be found')
    }
}

export const getBlog: Handler = async (req, res) => {
    try {
        const reqFind: blogFind = { id: req.params.id }
        if (reqFind.id == null) throw 'No ID'
        const specificBlog = await blogModel.getBlog(reqFind)
        if (!specificBlog) throw 'Empty'
        res.status(200).send(specificBlog)
    } catch (err) {
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'Empty') res.status(404).send('This blog could not be found')
    }
}

export const getBlogsByAuthor: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const reqFind: authorFind = { authorId: decoded.id }
        if (reqFind.authorId == null) throw 'No Author ID'
        const user = await blogModel.getAuthor(reqFind)
        if (!user) throw 'No user'
        const authorBlogs = await blogModel.getBlogsByAuthor(reqFind)
        if (!authorBlogs) throw 'Empty'
        res.status(200).send(authorBlogs)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'No Author ID') res.status(400).send('No Author ID is being sent')
        if (err == 'No user') res.status(404).send('This user does not exist')
        else if (err == 'Empty') res.status(404).send('No blogs from this author could be found')
    }
}

export const deleteBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const userFind: authorFind = { authorId: decoded.id }
        if (userFind.authorId == null) throw 'No Author ID'
        const reqDelete: blogFind = { id: req.params.id }
        if (reqDelete.id == null) throw 'No ID'
        const specificBlog = await blogModel.getBlog(reqDelete)
        if (!specificBlog) throw 'No blog'
        if (specificBlog.authorId != decoded.id) throw 'Unauthorized user'
        const blogDelete = await blogModel.deleteBlog(reqDelete)
        if (!blogDelete) throw 'Empty'
        res.status(204).send('The blog was deleted correctly')
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'No Author ID') res.status(400).send('No Author ID is being sent')
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No blog') res.status(404).send('The blog does not exist')
        if (err == 'Unauthorized user') res.status(401).send('A user can only delete their own posts')
        if (err == 'Empty') res.status(400).send('This blog could not be deleted')
    }
}

export const recoverBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        const userFind: authorFind = { authorId: decoded.id }
        if (userFind.authorId == null) throw 'No Author ID'
        const reqRecover: blogFind = { id: req.params.id }
        if (reqRecover.id == null) throw 'No ID'
        const specificBlog = await blogModel.getBlog(reqRecover)
        if (!specificBlog) throw 'No blog'
        if (specificBlog.authorId != decoded.id) throw 'Unauthorized user'
        const blogRecover = await blogModel.recoverBlog(reqRecover)
        if (!blogRecover) throw 'Empty'
        res.status(200).send(blogRecover)
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'No Author ID') res.status(400).send('No Author ID is being sent')
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No blog') res.status(404).send('The blog does not exist')
        if (err == 'Unauthorized user') res.status(401).send('A user can only recover their own posts')
        if (err == 'Empty') res.status(400).send('This blog could not be recovered')
    }
}

export const updateBlog: Handler = async (req, res) => {
    try {
        const reqFind: blogFind = { id: req.params.id }
        if (reqFind.id == null) throw 'No ID'
        const blog = await blogModel.getBlog(reqFind)
        if (!blog) throw 'No blog'
        const reqUpdate: blogUpdate = { title: req.body.title, content: req.body.content }
        if (typeof reqUpdate.title != 'string') throw 'Invalid title'
        if (typeof reqUpdate.content != 'string') throw 'Invalid content'
        const blogUpdate = await blogModel.updateBlog(reqFind, reqUpdate)
        if (!blogUpdate) throw 'Empty'
        res.status(200).send(blogUpdate)
    } catch (err) {
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No blog') res.status(404).send('This blog could not be found')
        if (err == 'Invalid title') res.status(400).send('This title is invalid')
        if (err == 'Invalid content') res.status(400).send('This content is invalid')
        else if (err == 'Empty') res.status(400).send('This blog could not be updated')
    }
}

export const actuallyDeleteBlog: Handler = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) throw 'No cookie/token'
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!) as JwtPayload
        if (decoded.role == 'simpleUser') throw 'Unauthorized'
        const reqDelete: blogFind = { id: req.params.id }
        if (reqDelete.id == null) throw 'No ID'
        const likesFinalDelete = await blogModel.deleteLikes(reqDelete)
        if (!likesFinalDelete) throw 'Likes undeletable'
        const blogFinalDelete = await blogModel.actuallyDeleteBlog(reqDelete)
        if (!blogFinalDelete) throw 'Undeletable'
        res.status(204).send('The blog was completely deleted correctly')
    } catch (err) {
        if (err == 'No cookie/token') res.status(400).send('There is no cookie or token')
        if (err == 'Unauthorized') res.status(401).send('The user does not have the necessary access level')
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'Likes undeletable') res.status(400).send('The likes from this blog could not be completely deleted')
        if (err == 'Undeletable') res.status(400).send('This blog could not be completely deleted')
    }
}

export const popularityScore: Handler = async (req, res) => {
    try {
        const reqFind: blogFind = { id: req.params.id }
        if (reqFind.id == null) throw 'No ID'
        const blog = await blogModel.getBlog(reqFind)
        if (!blog) throw 'No blog'
        const popularity = await blogModel.popularityScore(reqFind)
        if (!popularity) throw 'No popularity score'
        res.status(200).send('Popularity updated')
    } catch (err) {
        if (err == 'No ID') res.status(400).send('No ID is being sent')
        if (err == 'No blog') res.status(404).send('This blog could not be found')
        if (err == 'No popularity score') res.status(400).send("This blog's popularity score could not be updated")
    }
}
// - - - - - - - -

export const deleteAllBlogs: Handler = async (req, res) => {
    try {
        const blogDelete = await blogModel.deleteAllBlogs()
        if (!blogDelete) throw 'Undeletable'
        res.status(204).send('The blogs were deleted correctly')
    } catch (err) {
        if (err == 'Undeletable') res.status(400).send('The blogs could not be deleted')
    }
}

export const deleteAllLikes: Handler = async (req, res) => {
    try {
        const blogDelete = await blogModel.deleteAllLikes()
        if (!blogDelete) throw 'Undeletable'
        res.status(204).send('The likes were deleted correctly')
    } catch (err) {
        if (err == 'Undeletable') res.status(400).send('The likes could not be deleted')
    }
}