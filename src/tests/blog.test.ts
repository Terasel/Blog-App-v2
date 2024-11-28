import { blogServer } from '../server/blogTestingServer'
import request from 'supertest'
import { RandomString } from "ts-randomstring/lib"
import supertest from 'supertest'

const agent = supertest.agent(blogServer)

describe('Starting DB delete', () => {
    it('should delete all entries in all tables', async () => {
        const likesDelete = await agent
            .delete('/api/likes')
        const blogDelete = await agent
            .delete('/api/blog')
        const usersDelete = await agent
            .delete('/api/users')
        expect(likesDelete.statusCode).toEqual(204)
        expect(blogDelete.statusCode).toEqual(204)
        expect(usersDelete.statusCode).toEqual(204)
    })
})

describe('Blog testing', () => {
    it('should login a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Morrigan',
                password: 'morrigan',
                role: 'simpleUser'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'morrigan'
            })
        expect(userLogin.statusCode).toEqual(200)
        expect(userLogin.text).toBe('User successfully logged in')
    })
    it('should create a new blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: 'Somewhere over the rainbow',
                content: 'whoknows'
            })
        expect(blogCreate.statusCode).toEqual(201)
        expect(blogCreate.body.title).toBe('Somewhere over the rainbow')
    })
    it('should not create a new blog without the required info', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                content: 'whoknows'
            })
        expect(blogCreate.statusCode).toEqual(400)
        expect(blogCreate.text).toBe('This title is invalid')
    })
    it('should like a blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: 'Way up high',
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mythal',
                password: 'mythal',
                role: 'simpleUser'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'mythal'
            })
        const blogLike = await agent
            .patch('/api/blog/' + blogId + '/liked')
        expect(blogLike.statusCode).toEqual(200)
        expect(blogLike.text).toBe('The blog was liked correctly')
    })
    it('a user should not be able to like their own blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: 'Way up high?',
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogLike = await agent
            .patch('/api/blog/' + blogId + '/liked')
        expect(blogLike.statusCode).toEqual(400)
        expect(blogLike.text).toBe('A user cannot like their own post')
    })
    it('should revert the like on a blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "There's a land that I heard of",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Solas',
                password: 'solas',
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'solas'
            })
        const blogLike = await agent
            .patch('/api/blog/' + blogId + '/liked')
        const blogDislike = await agent
            .patch('/api/blog/' + blogId + '/disliked')
        expect(blogDislike.statusCode).toEqual(204)
    })
    it('should not revert the like on a blog that has not been previously liked', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "There's a land that I heard of?",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Atris',
                password: 'atris',
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'atris'
            })
        const blogLike = await agent
            .patch('/api/blog/' + blogId + '/disliked')
        expect(blogLike.statusCode).toEqual(400)
        expect(blogLike.text).toBe('The like does not exist')
    })
    it('should get all blogs, with the most recent at the top of the list', async () => {
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
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Once in a lullaby",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogGet = await agent
            .get('/api/blog/' + blogId)
        expect(blogGet.statusCode).toEqual(200)
        expect(blogGet.body.title).toBe("Once in a lullaby")
    })
    it('should not get a blog that does not exist', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Once in a lullaby?",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogGet = await agent
            .get('/api/blog/' + (blogId + 55))
        expect(blogGet.statusCode).toEqual(404)
        expect(blogGet.text).toBe('This blog could not be found')
    })
    it('should get the blogs from a specific author, with the most recent at the top of the list', async () => {
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bao Dur',
                password: 'baodur',
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'baodur'
            })
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Somewhere over the rainbow?",
                content: 'whoknows'
            })
        const blogCreate2 = await agent
            .post(`/api/blog`)
            .send({
                title: "Skies are blue",
                content: 'whoknows'
            })
        const blogGetbyAuthor = await agent
            .get('/api/blog/' + userCreate.body.id + '/byauthor')
        expect(blogGetbyAuthor.statusCode).toEqual(200)
        expect(blogGetbyAuthor.body[0].title).toBe("Skies are blue")
        expect(blogGetbyAuthor.body[1].title).toBe("Somewhere over the rainbow?")
    })
    it('should not get the blogs from an author that is not logged in', async () => {
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Elgarnan',
                password: 'elgarnan',
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'elgarnan'
            })
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Somewhere over the rainbow?",
                content: 'whoknows'
            })
        const userLogout2 = await agent
            .post('/api/logout')
        const blogGetbyAuthor = await agent
            .get('/api/blog/' + userCreate.body.id + '/byauthor')
        expect(blogGetbyAuthor.statusCode).toEqual(400)
        expect(blogGetbyAuthor.text).toBe('There is no cookie or token')
    })
    it('should delete a specific blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Sion',
                password: 'darthsion',
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'darthsion'
            })
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "And the dreams that you dare to dream",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogDelete = await agent
            .patch('/api/blog/' + blogId + '/delete')
        expect(blogDelete.statusCode).toEqual(204)
    })
    it('should not delete a blog that does not exist', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "And the dreams that you dare to dream?",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogDelete = await agent
            .patch('/api/blog/' + (blogId + 55) + '/delete')
        expect(blogDelete.statusCode).toEqual(404)
        expect(blogDelete.text).toBe('The blog does not exist')
    })
    it('should recover a deleted blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Really do come true",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogDelete = await agent
            .patch('/api/blog/' + blogId + '/delete')
        const blogRecover = await agent
            .patch('/api/blog/' + blogId + '/recover')
        expect(blogRecover.statusCode).toEqual(200)
        expect(blogRecover.body.deleted).toBe(false)
    })
    it('should not recover a deleted blog that does not exist', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Really do come true?",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogRecover = await agent
            .patch('/api/blog/' + (blogId + 55) + '/recover')
        expect(blogRecover.statusCode).toEqual(404)
        expect(blogRecover.text).toBe('The blog does not exist')
    })
    it('should update a blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Really do come true",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogUpdate = await agent
            .put('/api/blog/' + blogId)
            .send({
                title: "Really do come true?",
                content: 'En un rincón de la Mancha de cuyo nombre no quiero acordarme...'
            })
        expect(blogUpdate.statusCode).toEqual(200)
        expect(blogUpdate.body.title).toBe("Really do come true?")
        expect(blogUpdate.body.content).toBe('En un rincón de la Mancha de cuyo nombre no quiero acordarme...')
    })
    it('should not update a blog that does not exist', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Really do come true?",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogUpdate = await agent
            .put('/api/blog/' + (blogId + 55))
            .send({
                title: "Really do come true?",
                content: 'Vivía un caballero hidalgo'
            })
        expect(blogUpdate.statusCode).toEqual(404)
        expect(blogUpdate.text).toBe('This blog could not be found')
    })
    it('should irreversibly delete a specific blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Someday I'll wish upon a star",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogDelete = await agent
            .delete('/api/blog/' + blogId + '/final')
        const blogGet = await agent
            .get('/api/blog/' + blogId)
        expect(blogDelete.statusCode).toEqual(204)
        expect(blogGet.statusCode).toEqual(404)
        expect(blogGet.text).toBe('This blog could not be found')
    })
    it('should not irreversibly delete a specific blog if the logged user is not an admin', async () => {
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Ghilanain',
                password: 'ghilanain',
                role: 'simpleUser'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'ghilanain'
            })
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "Someday I'll wish upon a star?",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogDelete = await agent
            .delete('/api/blog/' + blogId + '/final')
        expect(blogDelete.statusCode).toEqual(401)
        expect(blogDelete.text).toBe('The user does not have the necessary access level')
    })
    it('should update the popularity of a specific blog', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "And wake up where the clouds are far behind me",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const userLogout = await agent
            .post('/api/logout')
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'June',
                password: 'june',
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'june'
            })
        const blogLike = await agent
            .patch('/api/blog/' + blogId + '/liked')
        const blogPopularity = await agent
            .patch('/api/blog/' + blogId + '/popularity')
        const blogGet = await agent
            .get('/api/blog/' + blogId)
        expect(blogPopularity.statusCode).toEqual(200)
        expect(blogPopularity.text).toBe('Popularity updated')
        expect(blogCreate.body.popularity).toBe('0%')
        expect(blogGet.body.popularity).toBe('12.5%')
    })
    it('should not update the popularity of a blog that does not exist', async () => {
        const blogCreate = await agent
            .post(`/api/blog`)
            .send({
                title: "And wake up where the clouds are far behind me",
                content: 'whoknows'
            })
        const blogId = blogCreate.body.id
        const blogLike = await agent
            .patch('/api/blog/' + blogId + '/liked')
        const blogPopularity = await agent
            .patch('/api/blog/' + (blogId + 55) + '/popularity')
        expect(blogPopularity.statusCode).toEqual(404)
        expect(blogPopularity.text).toBe('This blog could not be found')
    })
    it('should logout a user', async () => {
        const userLogout = await agent
            .post('/api/logout')
        expect(userLogout.statusCode).toEqual(200)
        expect(userLogout.text).toBe('Logout successful')
    })
})



describe('Final DB delete', () => {
    afterAll(() => {
        blogServer.close()
    })
    it('should delete all entries in all tables', async () => {
        const likesDelete = await agent
            .delete('/api/likes')
        const blogDelete = await agent
            .delete('/api/blog')
        const usersDelete = await agent
            .delete('/api/users')
        expect(likesDelete.statusCode).toEqual(204)
        expect(blogDelete.statusCode).toEqual(204)
        expect(usersDelete.statusCode).toEqual(204)
    })
})
