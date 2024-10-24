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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.banUser = exports.getUsers = exports.updateUser = exports.createUser = void 0;
const dbconnection_1 = require("../database/dbconnection");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield dbconnection_1.prisma.user.create({
            data: req.body,
        });
        if (!newUser)
            throw 'Not created';
        res.status(201).send(newUser);
    }
    catch (err) {
        if (err = 'Not created')
            res.status(422).send('This user could not be created');
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUpdate = yield dbconnection_1.prisma.user.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        });
        if (!userUpdate)
            throw 'Empty';
        res.status(200).send(userUpdate);
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send('This user could not be updated');
    }
});
exports.updateUser = updateUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dbconnection_1.prisma.user.findMany({});
        if (!users)
            throw 'No users';
        res.status(200).send(users);
    }
    catch (err) {
        if (err = 'No users')
            res.status(404).send('No users could be found');
    }
});
exports.getUsers = getUsers;
const banUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const userBan = yield dbconnection_1.prisma.user.update({
                where: {
                    id: +req.params.id,
                    banned: false
                },
                data: {
                    banned: true
                }
            });
            if (!userBan)
                throw 'Empty';
            res.status(200).send(userBan);
        }
        catch (_a) {
            const userBan = yield dbconnection_1.prisma.user.update({
                where: {
                    id: +req.params.id,
                    banned: true
                },
                data: {
                    banned: false
                }
            });
            if (!userBan)
                throw 'Empty';
            res.status(200).send(userBan);
        }
    }
    catch (err) {
        if (err = 'Empty')
            res.status(400).send('This user could not be banned/unbanned');
    }
});
exports.banUser = banUser;
// - - - - - - - -
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersDelete = yield dbconnection_1.prisma.user.deleteMany({});
        if (!usersDelete)
            throw 'Undeletable';
        res.status(204).send(usersDelete);
    }
    catch (err) {
        if (err = 'Undeletable')
            res.status(400).send('The users could not be deleted');
    }
});
exports.deleteAllUsers = deleteAllUsers;
