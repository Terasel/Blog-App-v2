// import { app } from '../domain/index'
// import request from 'supertest'
// import { createUser, updateUsername } from '../functionst-without-context'
// import { prismaMock } from '../singleton'
// describe('Blog API', () => {

//     it('should create a new blog for a user', async () => {
//         const userRes = await request(app)
//             .post('/api/users')
//             .send({
//                 email: 'johndoe88@hotmail.com',
//                 name: 'John Doe',
//                 role: 'admin'
//             });
//         const blogRes = await request(app)
//             .post(`/api/blog`)
//             .send({
//                 title: 'Somewhere over the rainbow',
//                 authorId: 1
//             });
//         expect(blogRes.statusCode).toEqual(201);
//         expect(blogRes.body).toHaveProperty('id');
//         expect(blogRes.body.title).toBe('Somewhere over the rainbow');
//         expect(blogRes.body.authorId).toBe(1);
//     });
// })

