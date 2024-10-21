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
    it('should not create a new blog without the required info', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Vette',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                authorId: userCreate.body.id
            })
        expect(blogCreate.statusCode).toEqual(422)
        expect(blogCreate.text).toBe('This blog could not be created')
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
        expect(blogLike.statusCode).toEqual(200)
        expect(blogLike.body.liked).toBe(true)
    })
    it('should not like a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bowdaar',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: 'Way up high?',
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/liked')
        expect(blogLike.statusCode).toEqual(400)
        expect(blogLike.text).toBe("This blog's liked status could not be updated")
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
        expect(blogLike.statusCode).toEqual(200)
        expect(blogLike.body.liked).toBe(false)
    })
    it('should not revert the like on a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Atris',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "There's a land that I heard of?",
                authorId: userCreate.body.id,
                liked: true
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/liked')
        expect(blogLike.statusCode).toEqual(400)
        expect(blogLike.text).toBe("This blog's liked status could not be updated")
    })
    it('should get all blogs', async () => {
        const blogsGet = await request(blogServer)
            .get('/api/blog')
        expect(blogsGet.statusCode).toEqual(200)
        expect(blogsGet.body[0].title).toBe("There's a land that I heard of?")
        expect(blogsGet.body[1].title).toBe("There's a land that I heard of")
        expect(blogsGet.body[2].title).toBe('Way up high?')
        expect(blogsGet.body[3].title).toBe('Way up high')
        expect(blogsGet.body[4].title).toBe('Somewhere over the rainbow')
    })
    it('should get a specific blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Visas Marr',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Once in a lullaby",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogGet = await request(blogServer)
            .get('/api/blog/' + blogId)
        expect(blogGet.statusCode).toEqual(200)
        expect(blogGet.body.title).toBe("Once in a lullaby")
    })
    it('should not get a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Null',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Once in a lullaby?",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogGet = await request(blogServer)
            .get('/api/blog/' + (blogId + 55))
        expect(blogGet.statusCode).toEqual(404)
        expect(blogGet.text).toBe('This blog could not be found')
    })
    it('should get the blogs from a specific author', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bao Dur',
                role: 'admin'
            })
        const userCreate2 = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'G0-T0',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Somewhere over the rainbow?",
                authorId: userCreate.body.id
            })
        const blogCreate2 = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Somewhere over the rainbow!",
                authorId: userCreate2.body.id
            })
        const blogCreate3 = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Skies are blue",
                authorId: userCreate.body.id
            })
        const blogGetbyAuthor = await request(blogServer)
            .get('/api/blog/' + blogCreate.body.authorId + '/byauthor')
        expect(blogGetbyAuthor.statusCode).toEqual(200)
        expect(blogGetbyAuthor.body[0].title).toBe("Somewhere over the rainbow?")
        expect(blogGetbyAuthor.body[1].title).toBe("Skies are blue")
    })
    it('should delete a specific blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Sion',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "And the dreams that you dare to dream",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogDelete = await request(blogServer)
            .patch('/api/blog/' + blogId)
        expect(blogDelete.statusCode).toEqual(204)
    })
    it('should not delete a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Coorta',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "And the dreams that you dare to dream?",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogDelete = await request(blogServer)
            .patch('/api/blog/' + (blogId + 55))
        expect(blogDelete.statusCode).toEqual(400)
        expect(blogDelete.text).toBe('This blog could not be deleted')
    })
    it('should recover a deleted blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Traya',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Really do come true",
                authorId: userCreate.body.id,
                deleted: true
            })
        const blogId = blogCreate.body.id
        const blogRecover = await request(blogServer)
            .patch('/api/blog/' + blogId + '/recover')
        expect(blogRecover.statusCode).toEqual(200)
        expect(blogRecover.body.title).toBe("Really do come true")
        expect(blogRecover.body.deleted).toBe(false)
    })
    it('should update a blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Nihilus',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Really do come true",
                authorId: userCreate.body.id,
                deleted: true
            })
        const blogId = blogCreate.body.id
        const blogUpdate = await request(blogServer)
            .put('/api/blog/' + blogId)
            .send({
                title: "Really do come true?",
                content: 'En un rincón de la Mancha de cuyo nombre no quiero acordarme...'
            })
        expect(blogUpdate.statusCode).toEqual(200)
        expect(blogUpdate.body.title).toBe("Really do come true?")
        expect(blogUpdate.body.content).toBe('En un rincón de la Mancha de cuyo nombre no quiero acordarme...')
    })
    it('should irreversibly delete a specific blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Vogga the Hutt',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Someday I'll wish upon a star",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogDelete = await request(blogServer)
            .delete('/api/blog/' + blogId + '/final')
        const blogGet = await request(blogServer)
            .get('/api/blog/' + blogId)
        expect(blogDelete.statusCode).toEqual(204)
        expect(blogGet.statusCode).toEqual(404)
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
