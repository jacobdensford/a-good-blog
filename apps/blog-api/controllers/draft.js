const { prisma } = require("../lib/prisma.js");
const { validationResult } = require("express-validator");

async function getDrafts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: false,
                authorId: +req.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.send(posts);
    } catch (err) {
        return next(err);
    }
}

async function getDraft(req, res, next) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +req.params.postId,
            },
        });
        if (!post) {
            return res.status(404).json({ errors: ["Not found"] });
        }
        return res.send(post);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getDrafts,
    getDraft,
};
