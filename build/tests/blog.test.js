"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogTestingServer_1 = require("../server/blogTestingServer");
const usersTestingServer_1 = require("../server/usersTestingServer");
const supertest_1 = __importDefault(require("supertest"));
const lib_1 = require("ts-randomstring/lib");
describe('Blog testing', () => {
    it('should create a new blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Mission Vao',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: 'Somewhere over the rainbow',
            authorId: userCreate.body.id
        });
        expect(blogCreate.statusCode).toEqual(201);
        expect(blogCreate.body.title).toBe('Somewhere over the rainbow');
        expect(blogCreate.body.authorId).toBe(userCreate.body.id);
    }));
    it('should not create a new blog without the required info', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Vette',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            authorId: userCreate.body.id
        });
        expect(blogCreate.statusCode).toEqual(422);
        expect(blogCreate.text).toBe('This blog could not be created');
    }));
    it('should like a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Zaalbar',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: 'Way up high',
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogLike = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId + '/liked');
        expect(blogLike.statusCode).toEqual(200);
        expect(blogLike.body.liked).toBe(true);
    }));
    it('should not like a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Bowdaar',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: 'Way up high?',
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogLike = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/liked');
        expect(blogLike.statusCode).toEqual(400);
        expect(blogLike.text).toBe("This blog's liked status could not be updated");
    }));
    it('should revert the like on a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Handmaiden',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "There's a land that I heard of",
            authorId: userCreate.body.id,
            liked: true
        });
        const blogId = blogCreate.body.id;
        const blogLike = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId + '/liked');
        expect(blogLike.statusCode).toEqual(200);
        expect(blogLike.body.liked).toBe(false);
    }));
    it('should not revert the like on a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Atris',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "There's a land that I heard of?",
            authorId: userCreate.body.id,
            liked: true
        });
        const blogId = blogCreate.body.id;
        const blogLike = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/liked');
        expect(blogLike.statusCode).toEqual(400);
        expect(blogLike.text).toBe("This blog's liked status could not be updated");
    }));
    it('should get all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const blogsGet = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog');
        expect(blogsGet.statusCode).toEqual(200);
        expect(blogsGet.body[0].title).toBe("There's a land that I heard of?");
        expect(blogsGet.body[1].title).toBe("There's a land that I heard of");
        expect(blogsGet.body[2].title).toBe('Way up high?');
        expect(blogsGet.body[3].title).toBe('Way up high');
        expect(blogsGet.body[4].title).toBe('Somewhere over the rainbow');
    }));
    it('should get a specific blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Visas Marr',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Once in a lullaby",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogGet = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + blogId);
        expect(blogGet.statusCode).toEqual(200);
        expect(blogGet.body.title).toBe("Once in a lullaby");
    }));
    it('should not get a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Null',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Once in a lullaby?",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogGet = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + (blogId + 55));
        expect(blogGet.statusCode).toEqual(404);
        expect(blogGet.text).toBe('This blog could not be found');
    }));
    it('should get the blogs from a specific author', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Bao Dur',
            role: 'admin'
        });
        const userCreate2 = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'G0-T0',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Somewhere over the rainbow?",
            authorId: userCreate.body.id
        });
        const blogCreate2 = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Somewhere over the rainbow!",
            authorId: userCreate2.body.id
        });
        const blogCreate3 = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Skies are blue",
            authorId: userCreate.body.id
        });
        const blogGetbyAuthor = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + blogCreate.body.authorId + '/byauthor');
        expect(blogGetbyAuthor.statusCode).toEqual(200);
        expect(blogGetbyAuthor.body[0].title).toBe("Somewhere over the rainbow?");
        expect(blogGetbyAuthor.body[1].title).toBe("Skies are blue");
    }));
    it('should delete a specific blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Sion',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "And the dreams that you dare to dream",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogDelete = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId);
        expect(blogDelete.statusCode).toEqual(204);
    }));
    it('should not delete a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Coorta',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "And the dreams that you dare to dream?",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogDelete = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + (blogId + 55));
        expect(blogDelete.statusCode).toEqual(400);
        expect(blogDelete.text).toBe('This blog could not be deleted');
    }));
    it('should recover a deleted blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Traya',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Really do come true",
            authorId: userCreate.body.id,
            deleted: true
        });
        const blogId = blogCreate.body.id;
        const blogRecover = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId + '/recover');
        expect(blogRecover.statusCode).toEqual(200);
        expect(blogRecover.body.title).toBe("Really do come true");
        expect(blogRecover.body.deleted).toBe(false);
    }));
    it('should not recover a deleted blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Master Kaedan',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Really do come true?",
            authorId: userCreate.body.id,
            deleted: true
        });
        const blogId = blogCreate.body.id;
        const blogRecover = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/recover');
        expect(blogRecover.statusCode).toEqual(400);
        expect(blogRecover.text).toBe('This blog could not be recovered');
    }));
    it('should update a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Nihilus',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Really do come true",
            authorId: userCreate.body.id,
            deleted: true
        });
        const blogId = blogCreate.body.id;
        const blogUpdate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .put('/api/blog/' + blogId)
            .send({
            title: "Really do come true?",
            content: 'En un rincón de la Mancha de cuyo nombre no quiero acordarme...'
        });
        expect(blogUpdate.statusCode).toEqual(200);
        expect(blogUpdate.body.title).toBe("Really do come true?");
        expect(blogUpdate.body.content).toBe('En un rincón de la Mancha de cuyo nombre no quiero acordarme...');
    }));
    it('should not update a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Ravage',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Really do come true?",
            authorId: userCreate.body.id,
            deleted: true
        });
        const blogId = blogCreate.body.id;
        const blogUpdate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .put('/api/blog/' + (blogId + 55))
            .send({
            title: "Really do come true?",
            content: 'Vivía un caballero hidalgo'
        });
        expect(blogUpdate.statusCode).toEqual(400);
        expect(blogUpdate.text).toBe('This blog could not be updated');
    }));
    it('should irreversibly delete a specific blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Vogga the Hutt',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Someday I'll wish upon a star",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogDelete = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .delete('/api/blog/' + blogId + '/final');
        const blogGet = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + blogId);
        expect(blogDelete.statusCode).toEqual(204);
        expect(blogGet.statusCode).toEqual(404);
    }));
    it('should not irreversibly delete a specific blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Visquis',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Someday I'll wish upon a star?",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogDelete = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .delete('/api/blog/' + (blogId + 55) + '/final');
        expect(blogDelete.statusCode).toEqual(400);
        expect(blogDelete.text).toBe('This blog could not be completely deleted');
    }));
    it('should display the popularity of a specific blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Ravage',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "And wake up where the clouds are far behind me",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogLike = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId + '/liked');
        const blogPopularity = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + blogId + '/popularity');
        const users = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .get('/api/users');
        const usersLength = users.body.length;
        const specificBlog = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + blogId);
        const likes = specificBlog.body.likeCounter;
        const popularity = (likes / (usersLength - 1)) * 100;
        expect(blogPopularity.statusCode).toEqual(200);
        expect(blogPopularity.text).toBe(popularity + '%');
    }));
    it('should not display the popularity of a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Marr',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "And wake up where the clouds are far behind me",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogLike = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId + '/liked');
        const blogPopularity = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .get('/api/blog/' + (blogId + 55) + '/popularity');
        expect(blogPopularity.statusCode).toEqual(404);
        expect(blogPopularity.text).toBe('This blog could not be found');
    }));
    it('should increase the like counter from a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Noctis',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Where troubles melt like lemon drops",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogCounter = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + blogId + '/counter');
        expect(blogCounter.statusCode).toEqual(200);
        expect(blogCounter.body.likeCounter).toBe(1);
    }));
    it('should not increase the like counter from a blog that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Thanaton',
            role: 'admin'
        });
        const blogCreate = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .post(`/api/blog`)
            .send({
            title: "Where troubles melt like lemon drops?",
            authorId: userCreate.body.id
        });
        const blogId = blogCreate.body.id;
        const blogCounter = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .patch('/api/blog/' + (blogId + 55) + '/counter');
        expect(blogCounter.statusCode).toEqual(400);
        expect(blogCounter.text).toBe("This blog's like counter could not be increased");
    }));
});
describe('DB delete', () => {
    afterAll(() => {
        blogTestingServer_1.blogServer.close();
        usersTestingServer_1.userServer.close();
    });
    it('should delete all blog entries', () => __awaiter(void 0, void 0, void 0, function* () {
        const blogDelete = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .delete('/api/blog');
        expect(blogDelete.statusCode).toEqual(204);
    }));
    it('should delete all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersDelete = yield (0, supertest_1.default)(blogTestingServer_1.blogServer)
            .delete('/api/users');
        expect(usersDelete.statusCode).toEqual(204);
    }));
});
