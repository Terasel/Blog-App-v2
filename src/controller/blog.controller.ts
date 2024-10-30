import { Handler } from 'express'
import { blogModel } from '../models/blog'

export const createBlog: Handler = async (req, res) => {
    try {
        const newBlog = await blogModel.createBlog(req, res)
        if (!newBlog) throw 'Not created'
        res.status(201).send(newBlog)
    } catch (err) {
        if (err = 'Not created') res.status(422).send('This blog could not be created')
    }
}

export const likeBlog: Handler = async (req, res) => {
    try {
        try {
            const blogLike = await blogModel.likeBlog(req, res)
            if (!blogLike) throw 'Empty'
            res.status(200).send(blogLike);
        } catch {
            const blogLike = await blogModel.dislikeBlog(req, res)
            if (!blogLike) throw 'Empty'
            res.status(200).send(blogLike);
        }
    } catch (err) {
        if (err = 'Empty') res.status(400).send("This blog's liked status could not be updated");
    }
}

export const getBlogs: Handler = async (req, res) => {
    try {
        const blogs = await blogModel.getBlogs(req, res)
        if (!blogs) throw 'Empty'
        res.status(200).send(blogs)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('No blogs could be found')
    }
}

export const getBlog: Handler = async (req, res) => {
    try {
        const specificBlog = await blogModel.getBlog(req, res)
        if (!specificBlog) throw 'Empty'
        res.status(200).send(specificBlog)
    } catch (err) {
        if (err = 'Empty') res.status(404).send('This blog could not be found')
    }
}

export const getBlogsByAuthor: Handler = async (req, res) => {
    try {
        const user = await blogModel.getAuthor(req, res)
        if (!user) throw 'No user'
        const authorBlogs = await blogModel.getBlogsByAuthor(req, res)
        if (!authorBlogs) throw 'Empty'
        res.status(200).send(authorBlogs)
    } catch (err) {
        if (err = 'No user') res.status(404).send('This user does not exist')
        else if (err = 'Empty') res.status(404).send('No blogs from this author could be found')
    }
}

export const deleteBlog: Handler = async (req, res) => {
    try {
        const blogDelete = await blogModel.deleteBlog(req, res)
        if (!blogDelete) throw 'Empty'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be deleted')
    }
}

export const recoverBlog: Handler = async (req, res) => {
    try {
        const blogRecover = await blogModel.recoverBlog(req, res)
        if (!blogRecover) throw 'Empty'
        res.status(200).send(blogRecover)
    } catch (err) {
        if (err = 'Empty') res.status(400).send('This blog could not be recovered')
    }
}

export const updateBlog: Handler = async (req, res) => {
    try {
        const blog = await blogModel.getBlog(req, res)
        if (!blog) throw 'No blog'
        const blogUpdate = await blogModel.updateBlog(req, res)
        if (!blogUpdate) throw 'Empty'
        res.status(200).send(blogUpdate)
    } catch (err) {
        if (err = 'No blog') res.status(404).send('This blog could not be found')
        else if (err = 'Empty') res.status(400).send('This blog could not be updated')
    }
}

export const actuallyDeleteBlog: Handler = async (req, res) => {
    try {
        const blogFinalDelete = await blogModel.actuallyDeleteBlog(req, res)
        if (!blogFinalDelete) throw 'Undeletable'
        res.status(204).send(blogFinalDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('This blog could not be completely deleted')
    }
}

export const popularityScore: Handler = async (req, res) => {
    try {
        const popularity = await blogModel.popularityScore(req, res)
        if (!popularity) throw 'No popularity score'
        res.status(200).send(popularity + '%')
    } catch (err) {
        if (err = 'No popularity score') res.status(400).send("This blog's popularity score could not be displayed")
    }
}
// - - - - - - - -
export const increaseCounter: Handler = async (req, res) => {
    try {
        const blogCounter = await blogModel.increaseCounter(req, res)
        if (!blogCounter) throw 'Empty'
        res.status(200).send(blogCounter)
    } catch (err) {
        if (err = 'Empty') res.status(400).send("This blog's like counter could not be increased")
    }
}

export const deleteAllBlogs: Handler = async (req, res) => {
    try {
        const blogDelete = await blogModel.deleteAllBlogs(req, res)
        if (!blogDelete) throw 'Undeletable'
        res.status(204).send(blogDelete)
    } catch (err) {
        if (err = 'Undeletable') res.status(400).send('The blogs could not be deleted')
    }
}

export const testing: Handler = async (req, res) => {
    try {
        const users = await blogModel.testing(req, res)
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send('The testing did not work')
    }
}
