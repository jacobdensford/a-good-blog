const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
require("dotenv/config");
const authorPass = process.env.AUTHOR_PASS || false;
const adminPass = process.env.ADMIN_PASS || false;

async function getUsers(req, res, next) {
    try {
        const users = await prisma.user.findMany({
            omit: {
                password: true,
            },
            orderBy: {
                username: "desc",
            },
        });
        res.send(users);
    } catch (err) {
        return next(err);
    }
}

async function getUser(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +req.params.userId,
            },
            omit: {
                password: true,
            },
        });
        if (!user) {
            return res.status(404).json({ errors: ["Not found"] });
        }
        res.send(user);
    } catch (err) {
        return next(err);
    }
}

async function getUserPosts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: +req.params.userId,
            },
        });
        res.send(posts);
    } catch (err) {
        return next(err);
    }
}

async function getUserComments(req, res, next) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                authorId: +req.params.userId,
            },
        });
        res.send(comments);
    } catch (err) {
        return next(err);
    }
}

async function postUser(req, res, next) {
    const { username, password, name, author, admin } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const users = await prisma.user.findMany();
        if (users.length < 1) {
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    name: name || null,
                    author: true,
                    admin: true,
                },
            });
        } else {
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    name: name || null,
                    author: author === authorPass ? true : false,
                    admin: admin === adminPass ? true : false,
                },
            });
        }
        const { password: _password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
    } catch (err) {
        return next(err);
    }
}

async function putUser(req, res, next) {
    const { username, password, name, author, admin } = req.body;
    const userData = {};
    for (const [key, value] of Object.entries({
        username,
        password,
        name,
        author,
        admin,
    })) {
        if (value !== undefined) {
            if (key === "password") {
                userData[key] = await bcrypt.hash(value, 10);
            } else if (key === "author") {
                if (value === authorPass) {
                    userData[key] = true;
                }
            } else if (key === "admin") {
                if (value === adminPass) {
                    userData[key] = true;
                }
            } else {
                userData[key] = value;
            }
        }
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: +req.user.id,
            },
            data: userData,
        });
        const { password: _password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
    } catch (err) {
        return next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: +req.user.id,
            },
        });
        const { password: _password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserPosts,
    getUserComments,
    postUser,
    putUser,
    deleteUser,
};
