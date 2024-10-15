import { app } from '../domain/index'
import request from 'supertest'
describe('Blog API', () => {

    it('should create a new user', async () => {
        const emailGen = 'whoknows' + Math.floor(Math.random() * 10).toString() + '@hotmail.com'
        const userRes = await request(app)
            .post('/api/users')
            .send({
                email: emailGen,
                name: 'Mysterious Stranger',
                role: 'admin'
            });

        expect(userRes.statusCode).toEqual(201);
        expect(userRes.body.email).toBe(emailGen);
        expect(userRes.body.name).toBe('Mysterious Stranger');
        expect(userRes.body.role).toBe('admin');
    });
    it('should create a new blog', async () => {
        const blogRes = await request(app)
            .post(`/api/blog`)
            .send({
                title: 'Somewhere over the rainbow',
                authorId: 1
            });
        expect(blogRes.statusCode).toEqual(201);
        expect(blogRes.body.title).toBe('Somewhere over the rainbow');
        expect(blogRes.body.authorId).toBe(1);
    })
})
// import { MockContext, Context, createMockContext } from '../infrastructure/context'
// import { createBlog, updateBlog } from '../controller/blog.controller'
// import { createUser, updateUser } from '../controller/user.controller'

// let mockCtx: MockContext
// let ctx: Context

// beforeEach(() => {
//     mockCtx = createMockContext()
//     ctx = mockCtx as unknown as Context
// })

// test('should create new user ', async () => {
//     const user = {
//         id: 1,
//         email: 'hello@prisma.io',
//         name: 'Rich',
//         bio: null,
//         role: 'admin',
//         banned: false
//     }
//     mockCtx.prisma.user.create.mockResolvedValue(user)

//     await expect(createUser(req: Request, res: Response)).resolves.toEqual({
//         id: 1,
//         email: 'hello@prisma.io',
//         name: 'Rich',
//         bio: null,
//         role: 'admin',
//         banned: false
//     })
// })
// import { PrismaClient } from "@prisma/client";
// import {prisma} from '../infrastructure/dbconnection'
// const mockedPrismaClient = new (<new () => PrismaClient>(
//     PrismaClient
//   ))() as jest.Mocked<PrismaClient>;

//   describe ('Blog tests', ()=> {
//     afterEach(() => {
//         jest.resetAllMocks();
//       });

//   }) 