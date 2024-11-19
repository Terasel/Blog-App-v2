import { userServer } from '../server/usersTestingServer'
import request from 'supertest'
import { RandomString } from "ts-randomstring/lib"
import bcrypt from 'bcrypt'

describe('Starting DB delete', () => {
    it('should delete all blog entries', async () => {
        const blogDelete = await request(userServer)
            .delete('/api/blog')
        expect(blogDelete.statusCode).toEqual(204)
    })
    it('should delete all users', async () => {
        const usersDelete = await request(userServer)
            .delete('/api/users')
        expect(usersDelete.statusCode).toEqual(204)
    })
})

describe('User testing', () => {
    it('should create a new user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
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
    it('should not create a new user without the necessary info', async () => {
        const userCreate = await request(userServer)
            .post('/api/users')
            .send({
                name: 'Mysterious Stranger',
                password: 'mysteriousstranger',
                role: 'admin'
            })

        expect(userCreate.statusCode).toEqual(422)
        expect(userCreate.text).toBe('This user could not be created')
    })
    it('should login a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Morrigan',
                password: 'morrigan',
                role: 'admin'
            })
        const userLogin = await request(userServer)
            .post('/api/login')
            .send({
                email: emailGen,
                password: 'morrigan'
            })
        expect(userLogin.statusCode).toEqual(200)
    })
    it('should not login a user that does not exist', async () => {
        const userLogin = await request(userServer)
            .post('/api/login')
            .send({
                email: 'deeznuts56789@hotmail.com',
                password: 'dfhdfjdfhjyd'
            })
        expect(userLogin.statusCode).toEqual(400)
        expect(userLogin.text).toBe('The password and/or email address is incorrect')
    })
    it('should logout a user', async () => {
        const userLogout = await request(userServer)
            .post('/api/logout')
        expect(userLogout.statusCode).toEqual(200)
        expect(userLogout.text).toBe('Logout successful')
    })
    it('should get all users', async () => {
        const usersGet = await request(userServer)
            .get('/api/users')
        expect(usersGet.statusCode).toEqual(200)
        expect(usersGet.body[0].name).toBe('Mysterious Stranger')
        expect(usersGet.body[1].name).toBe('Morrigan')
    })
    it('should update a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
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
        const userUpdate = await request(userServer)
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
        const userCreate = await request(userServer)
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
        const userUpdate = await request(userServer)
            .put('/api/users/' + (userId + 55))
            .send({
                email: emailGen2,
                name: 'Juhani?'
            })
        expect(userUpdate.statusCode).toEqual(404)
        expect(userUpdate.text).toBe('This user could not be found')
    })
    it('should ban a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Bastila Shan',
                password: 'bastilashan',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await request(userServer)
            .patch('/api/users/' + userId + '/ban')
        expect(userBan.statusCode).toEqual(200)
        expect(userBan.body.banned).toBe(true)
    })
    it('should not ban a user that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Theron Shan',
                password: 'theronshan',
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await request(userServer)
            .patch('/api/users/' + (userId + 55) + '/ban')
        expect(userBan.statusCode).toEqual(400)
        expect(userBan.text).toBe('This user could not be banned')
    })
    it('should unban a user', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Canderous Ordo',
                password: 'canderousordo',
                role: 'admin',
                banned: true
            })
        const userId = userCreate.body.id
        const userBan = await request(userServer)
            .patch('/api/users/' + userId + '/unban')
        expect(userBan.statusCode).toEqual(200)
        expect(userBan.body.banned).toBe(false)
    })
    it('should not unban a user that does not exist', async () => {
        const randomString = new RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com'
        const userCreate = await request(userServer)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Lana Beniko',
                password: 'lanabeniko',
                role: 'admin',
                banned: true
            })
        const userId = userCreate.body.id
        const userBan = await request(userServer)
            .patch('/api/users/' + (userId + 55) + '/unban')
        expect(userBan.statusCode).toEqual(400)
        expect(userBan.text).toBe('This user could not be unbanned')
    })
})

describe('Final DB delete', () => {
    afterAll(() => {
        userServer.close()
    })
    it('should delete all blog entries', async () => {
        const blogDelete = await request(userServer)
            .delete('/api/blog')
        expect(blogDelete.statusCode).toEqual(204)
    })
    it('should delete all users', async () => {
        const usersDelete = await request(userServer)
            .delete('/api/users')
        expect(usersDelete.statusCode).toEqual(204)
    })
})