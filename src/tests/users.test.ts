import { userServer } from '../domain/usersTestingServer'
import request from 'supertest'
import { RandomString } from "ts-randomstring/lib"

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
                role: 'admin'
            })

        expect(userCreate.statusCode).toEqual(201)
        expect(userCreate.body.email).toBe(emailGen)
        expect(userCreate.body.name).toBe('Mysterious Stranger')
        expect(userCreate.body.role).toBe('admin')
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
    it('should get all users', async () => {
        const usersGet = await request(userServer)
            .get('/api/users')
        expect(usersGet.statusCode).toEqual(200)
        expect(usersGet.body[0].name).toBe('Mysterious Stranger')
        expect(usersGet.body[1].name).toBe('Deadeye Duncan')
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
                role: 'admin'
            })
        const userId = userCreate.body.id
        const userBan = await request(userServer)
            .patch('/api/users/' + userId + '/ban')
        expect(userBan.body.banned).toBe(true)
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
                role: 'admin',
                banned: true
            })
        const userId = userCreate.body.id
        const userBan = await request(userServer)
            .patch('/api/users/' + userId + '/ban')
        expect(userBan.body.banned).toBe(false)
    })
})

describe('DB delete', () => {
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