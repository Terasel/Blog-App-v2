import { blogServer } from '../server/blogTestingServer'
import { userServer } from '../server/usersTestingServer'
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
                password: 'missionvao',
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
                password: 'vette',
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
                password: 'zaalbar',
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
                password: 'bowdaar',
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
                password: 'handmaiden',
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
                password: 'atris',
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
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Visas Marr',
                password: 'visasmarr',
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
                password: 'darthnull',
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
    it('should get the blogs from a specific author, with the most recent at the top of the list', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bao Dur',
                password: 'baodur',
                role: 'admin'
            })
        const userCreate2 = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'G0-T0',
                password: 'g0t0',
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
        expect(blogGetbyAuthor.body[0].title).toBe("Skies are blue")
        expect(blogGetbyAuthor.body[1].title).toBe("Somewhere over the rainbow?")
    })
    it('should not get the blogs from an author that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bao Dur',
                password: 'baodur',
                role: 'admin'
            })
        const userCreate2 = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'G0-T0',
                password: 'g0t0',
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
            .get('/api/blog/' + (blogCreate.body.authorId + 55) + '/byauthor')
        expect(blogGetbyAuthor.statusCode).toEqual(404)
        expect(blogGetbyAuthor.text).toBe('This user does not exist')
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
                password: 'darthsion',
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
                password: 'coorta',
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
                password: 'darthtraya',
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
    it('should not recover a deleted blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Master Kaedan',
                password: 'masterkaedan',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Really do come true?",
                authorId: userCreate.body.id,
                deleted: true
            })
        const blogId = blogCreate.body.id
        const blogRecover = await request(blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/recover')
        expect(blogRecover.statusCode).toEqual(400)
        expect(blogRecover.text).toBe('This blog could not be recovered')
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
                password: 'darthnihilus',
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
    it('should not update a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Ravage',
                password: 'darthravage',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Really do come true?",
                authorId: userCreate.body.id,
                deleted: true
            })
        const blogId = blogCreate.body.id
        const blogUpdate = await request(blogServer)
            .put('/api/blog/' + (blogId + 55))
            .send({
                title: "Really do come true?",
                content: 'Vivía un caballero hidalgo'
            })
        expect(blogUpdate.statusCode).toEqual(404)
        expect(blogUpdate.text).toBe('This blog could not be found')
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
                password: 'voggathehutt',
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
    it('should not irreversibly delete a specific blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Visquis',
                password: 'visquis',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Someday I'll wish upon a star?",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogDelete = await request(blogServer)
            .delete('/api/blog/' + (blogId + 55) + '/final')
        expect(blogDelete.statusCode).toEqual(400)
        expect(blogDelete.text).toBe('This blog could not be completely deleted')
    })
    it('should display the popularity of a specific blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Acina',
                password: 'darthacina',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "And wake up where the clouds are far behind me",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(blogServer)
            .patch('/api/blog/' + blogId + '/liked')
        const blogPopularity = await request(blogServer)
            .get('/api/blog/' + blogId + '/popularity')
        const users = await request(userServer)
            .get('/api/users')
        const usersLength = users.body.length
        const specificBlog = await request(blogServer)
            .get('/api/blog/' + blogId)
        const likes = specificBlog!.body.likeCounter
        const popularity = (likes / (usersLength - 1)) * 100
        expect(blogPopularity.statusCode).toEqual(200)
        expect(blogPopularity.text).toBe(popularity + '%')
    })
    it('should not display the popularity of a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Marr',
                password: 'darthmarr',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "And wake up where the clouds are far behind me",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogLike = await request(blogServer)
            .patch('/api/blog/' + blogId + '/liked')
        const blogPopularity = await request(blogServer)
            .get('/api/blog/' + (blogId + 55) + '/popularity')
        expect(blogPopularity.statusCode).toEqual(400)
        expect(blogPopularity.text).toBe("This blog's popularity score could not be displayed")
    })
    it('should increase the like counter from a blog', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Mortis',
                password: 'darthmortis',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Where troubles melt like lemon drops",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogCounter = await request(blogServer)
            .patch('/api/blog/' + blogId + '/counter')
        expect(blogCounter.statusCode).toEqual(200)
        expect(blogCounter.body.likeCounter).toBe(1)
    })
    it('should not increase the like counter from a blog that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(blogServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Thanaton',
                password: 'darththanaton',
                role: 'admin'
            })
        const blogCreate = await request(blogServer)
            .post(`/api/blog`)
            .send({
                title: "Where troubles melt like lemon drops?",
                authorId: userCreate.body.id
            })
        const blogId = blogCreate.body.id
        const blogCounter = await request(blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/counter')
        expect(blogCounter.statusCode).toEqual(400)
        expect(blogCounter.text).toBe("This blog's like counter could not be increased")
    })
})



describe('DB delete', () => {
    afterAll(() => {
        blogServer.close()
        userServer.close()
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
