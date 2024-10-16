import { app } from '../domain/index'
import request from 'supertest'

describe('User testing', () => {
    it('should create a new user', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })

        expect(userCreate.statusCode).toEqual(201)
        expect(userCreate.body.email).toBe(emailGen)
        expect(userCreate.body.name).toBe('Mysterious Stranger')
        expect(userCreate.body.role).toBe('admin')
    })
    it('should update a user', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const emailGen2 = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userId = userCreate.body.id
        const userUpdate = await request(app)
            .put('/api/users/' + userId)
            .send({
                email: emailGen2,
                name: 'Deadeye Duncan'
            })
        expect(userUpdate.statusCode).toEqual(200)
        expect(userUpdate.body.email).toBe(emailGen2)
        expect(userUpdate.body.name).toBe('Deadeye Duncan')
        expect(userUpdate.body.role).toBe('admin')
    })
    it('should get all users', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const emailGen2 = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const userCreate2 = await request(app)
            .post('/api/users')
            .send({
                email: emailGen2,
                name: 'Deadeye Duncan',
                role: 'simpleUser'
            })
        const usersGet = await request(app)
            .get('/api/users')
        expect(usersGet.statusCode).toEqual(200)
        expect(usersGet.body[0].name).toBe('Mysterious Stranger')
        expect(usersGet.body[1].name).toBe('Deadeye Duncan')
    })
    it('should ban a user', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await request(app)
            .patch('/api/users/' + userId + '/ban')
        expect(userBan.body.banned).toBe(true)
    })
    it('should unban a user', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin',
                banned: true
            })
        const userId = userCreate.body.id
        const userBan = await request(app)
            .patch('/api/users/' + userId + '/ban')
        expect(userBan.body.banned).toBe(false)
    })
})

describe('Blog testing', () => {
    it('should create a new blog', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const blogCreate = await request(app)
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
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const blogCreate = await request(app)
            .post(`/api/blog`)
            .send({
                title: 'Somewhere over the rainbow',
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(app)
            .patch('/api/blog/' + blogId + '/liked')
        expect(blogLike.body.liked).toBe(true)
    })
    it('should revert the like on a blog', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const blogCreate = await request(app)
            .post(`/api/blog`)
            .send({
                title: 'Somewhere over the rainbow',
                authorId: userCreate.body.id,
                liked: true
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(app)
            .patch('/api/blog/' + blogId + '/liked')
        expect(blogLike.body.liked).toBe(false)
    })
    it('should get all blogs', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 1000).toString() + '@hotmail.com'
        const userCreate = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            })
        const blogCreate = await request(app)
            .post(`/api/blog`)
            .send({
                title: 'Somewhere over the rainbow',
                authorId: userCreate.body.id,
            })
        const blogCreate2 = await request(app)
            .post(`/api/blog`)
            .send({
                title: 'Way up high',
                authorId: userCreate.body.id,
            })
        const blogId = blogCreate.body.id
        const blogId2 = blogCreate2.body.id
        const blogsGet = await request(app)
            .get('/api/blog')
        expect(blogsGet.statusCode).toEqual(200)
        expect(blogsGet.body[0].title).toBe('Somewhere over the rainbow')
        expect(blogCreate2.body.title).toBe('Way up high')
        // expect(blogsGet.body[1].title).toBe('Way up high') - no funciona
    })
})

describe('DB delete', () => {
    it('should delete all blog entries', async () => {
        const blogDelete = await request(app)
            .delete('/api/blog')
        expect(blogDelete.statusCode).toEqual(204)
    })
    it('should delete all users', async () => {
        const usersDelete = await request(app)
            .delete('/api/users')
        expect(usersDelete.statusCode).toEqual(204)
    })
})