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
const usersTestingServer_1 = require("../server/usersTestingServer");
const supertest_1 = __importDefault(require("supertest"));
const lib_1 = require("ts-randomstring/lib");
describe('User testing', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Mysterious Stranger',
            role: 'admin'
        });
        expect(userCreate.statusCode).toEqual(201);
        expect(userCreate.body.email).toBe(emailGen);
        expect(userCreate.body.name).toBe('Mysterious Stranger');
        expect(userCreate.body.role).toBe('admin');
    }));
    it('should not create a new user without the necessary info', () => __awaiter(void 0, void 0, void 0, function* () {
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            name: 'Mysterious Stranger',
            role: 'admin'
        });
        expect(userCreate.statusCode).toEqual(422);
        expect(userCreate.text).toBe('This user could not be created');
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Darth Revan',
            role: 'admin'
        });
        const randomString2 = new lib_1.RandomString();
        const rand2 = randomString2.generate();
        const emailGen2 = 'whoknows' + rand2 + '@hotmail.com';
        const userId = userCreate.body.id;
        const userUpdate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .put('/api/users/' + userId)
            .send({
            email: emailGen2,
            name: 'Deadeye Duncan'
        });
        expect(userUpdate.statusCode).toEqual(200);
        expect(userUpdate.body.email).toBe(emailGen2);
        expect(userUpdate.body.name).toBe('Deadeye Duncan');
        expect(userUpdate.body.role).toBe('admin');
    }));
    it('should not update a user that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Juhani',
            role: 'admin'
        });
        const randomString2 = new lib_1.RandomString();
        const rand2 = randomString2.generate();
        const emailGen2 = 'whoknows' + rand2 + '@hotmail.com';
        const userId = userCreate.body.id;
        const userUpdate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .put('/api/users/' + (userId + 55))
            .send({
            email: emailGen2,
            name: 'Juhani?'
        });
        expect(userUpdate.statusCode).toEqual(400);
        expect(userUpdate.text).toBe('This user could not be updated');
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersGet = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .get('/api/users');
        expect(usersGet.statusCode).toEqual(200);
        expect(usersGet.body[0].name).toBe('Mysterious Stranger');
        expect(usersGet.body[1].name).toBe('Deadeye Duncan');
    }));
    it('should ban a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Bastila Shan',
            role: 'admin'
        });
        const userId = userCreate.body.id;
        const userBan = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .patch('/api/users/' + userId + '/ban');
        expect(userBan.statusCode).toEqual(200);
        expect(userBan.body.banned).toBe(true);
    }));
    it('should not ban a user that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Theron Shan',
            role: 'admin'
        });
        const userId = userCreate.body.id;
        const userBan = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .patch('/api/users/' + (userId + 55) + '/ban');
        expect(userBan.statusCode).toEqual(400);
        expect(userBan.text).toBe('This user could not be banned/unbanned');
    }));
    it('should unban a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Canderous Ordo',
            role: 'admin',
            banned: true
        });
        const userId = userCreate.body.id;
        const userBan = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .patch('/api/users/' + userId + '/ban');
        expect(userBan.statusCode).toEqual(200);
        expect(userBan.body.banned).toBe(false);
    }));
    it('should not unban a user that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomString = new lib_1.RandomString();
        const rand = randomString.generate();
        const emailGen = 'whoknows' + rand + '@hotmail.com';
        const userCreate = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .post('/api/users')
            .send({
            email: emailGen,
            name: 'Lana Beniko',
            role: 'admin',
            banned: true
        });
        const userId = userCreate.body.id;
        const userBan = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .patch('/api/users/' + (userId + 55) + '/ban');
        expect(userBan.statusCode).toEqual(400);
        expect(userBan.text).toBe('This user could not be banned/unbanned');
    }));
});
describe('DB delete', () => {
    afterAll(() => {
        usersTestingServer_1.userServer.close();
    });
    it('should delete all blog entries', () => __awaiter(void 0, void 0, void 0, function* () {
        const blogDelete = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .delete('/api/blog');
        expect(blogDelete.statusCode).toEqual(204);
    }));
    it('should delete all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersDelete = yield (0, supertest_1.default)(usersTestingServer_1.userServer)
            .delete('/api/users');
        expect(usersDelete.statusCode).toEqual(204);
    }));
});
