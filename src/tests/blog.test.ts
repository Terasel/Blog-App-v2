import { blogServer } from '../domain/blogTestingServer'
import request from 'supertest'
import { RandomString } from "ts-randomstring/lib"

describe('Blog testing', () => {
    it('should create a new blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mission Vao',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: 'Somewhere over the rainbow',
                authorId: userCreate.body.id
            })
        expect(blogCreate.statusCode).toEqual(201)
        expect(blogCreate.body.title).toBe('Somewhere over the rainbow')
        expect(blogCreate.body.authorId).toBe(userCreate.body.id)
    })
    it('should like a blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Zaalbar',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: 'Way up high',
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(blogServer)
            .patch('/api/blog/' + blogId + '/liked')
        expect(blogLike.body.liked).toBe(true)
    })
    it('should revert the like on a blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Handmaiden',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "There's a land that I heard of",
                authorId: userCreate.body.id,
                liked: true
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(blogServer)
            .patch('/api/blog/' + blogId + '/liked')
        expect(blogLike.body.liked).toBe(false)
    })
    it('should get all blogs', async () => {
        const blogsGet = await request(blogServer)
            .get('/api/blog')
        expect(blogsGet.statusCode).toEqual(200)
        expect(blogsGet.body[0].title).toBe('Somewhere over the rainbow')
        expect(blogsGet.body[1].title).toBe('Way up high')
        expect(blogsGet.body[2].title).toBe("There's a land that I heard of")
    })
})

describe('DB delete', () => {
    afterAll(() => {
        blogServer.close()
    })
    it('should delete all blog entries', async () => {
        const blogDelete = await request(blogServer)
            .delete('/api/blog')
        expect(blogDelete.statusCode).toEqual(204)
    })
    it('should delete all users', async () => {
        const usersDelete = await request(blogServer)
            .delete('/api/users')
        expect(usersDelete.statusCode).toEqual(204)
    })
})
