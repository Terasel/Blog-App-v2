import { userServer } from '../server/usersTestingServer'
import { RandomString } from "ts-randomstring/lib"
import bcrypt from 'bcrypt'
import supertest from 'supertest'

const agent = supertest.agent(userServer)

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

describe('User testing', () => {
    it('should create a new user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                password: 'mysteriousstranger',
                role: 'admin'
            })
        const validPassword = await bcrypt.compare('mysteriousstranger', userCreate.body.password)
        expect(userCreate.statusCode).toEqual(201)
        expect(userCreate.body.email).toBe(emailGen)
        expect(userCreate.body.name).toBe('Mysterious Stranger')
        expect(validPassword).toBe(true)
        expect(userCreate.body.role).toBe('admin')
    })
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
                role: 'admin'
            })
        const userLogin = await agent
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'morrigan'
            })
        expect(userLogin.statusCode).toEqual(200)
    })
    it('should not create a new user with incorrectly formatted information', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: false,
                password: 'mysteriousstranger',
                role: 'admin'
            })

        expect(userCreate.statusCode).toEqual(400)
        expect(userCreate.text).toBe('This user name is invalid')
    })
    it('should update a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Darth Revan',
                password: 'darthrevan',
                role: 'admin'
            })
        const randomString2 = new RandomString();
        const rand2 = randomString2.generate();
        const emailGen2 = 'whoknows' + rand2 + '@hotmail.com'
        const userId = userCreate.body.id
        const userUpdate = await agent
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
    it('should not update a user that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Juhani',
                password: 'juhani',
                role: 'admin'
            })
        const randomString2 = new RandomString();
        const rand2 = randomString2.generate();
        const emailGen2 = 'whoknows' + rand2 + '@hotmail.com'
        const userId = userCreate.body.id
        const userUpdate = await agent
            .put('/api/users/' + (userId + 55))
            .send({
                email: emailGen2,
                name: 'Juhani?'
            })
        expect(userUpdate.statusCode).toEqual(404)
        expect(userUpdate.text).toBe('This user could not be found')
    })
    it('should get all users', async () => {
        const usersGet = await agent
            .get('/api/users')
        expect(usersGet.statusCode).toEqual(200)
        expect(usersGet.body[0].name).toBe('Mysterious Stranger')
        expect(usersGet.body[1].name).toBe('Morrigan')
        expect(usersGet.body[2].name).toBe('Deadeye Duncan')
        expect(usersGet.body[3].name).toBe('Juhani')
    })
    it('should ban a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bastila Shan',
                password: 'bastilashan',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await agent
            .patch('/api/users/' + userId + '/ban')
        expect(userBan.statusCode).toEqual(200)
        expect(userBan.body.banned).toBe(true)
    })
    it('should not ban a user that is already banned', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Theron Shan',
                password: 'theronshan',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await agent
            .patch('/api/users/' + userId + '/ban')
        const userBan2 = await agent
            .patch('/api/users/' + userId + '/ban')
        expect(userBan2.statusCode).toEqual(400)
        expect(userBan2.text).toBe('This user is already banned')
    })
    it('should unban a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Canderous Ordo',
                password: 'canderousordo',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await agent
            .patch('/api/users/' + userId + '/ban')
        const userUnban = await agent
            .patch('/api/users/' + userId + '/unban')
        expect(userUnban.statusCode).toEqual(200)
        expect(userUnban.body.banned).toBe(false)
    })
    it('should not unban a user that is not banned', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await agent
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Lana Beniko',
                password: 'lanabeniko',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await agent
            .patch('/api/users/' + userId + '/unban')
        expect(userBan.statusCode).toEqual(400)
        expect(userBan.text).toBe('This user is not banned')
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
        userServer.close()
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