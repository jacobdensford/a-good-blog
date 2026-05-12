const { prisma } = require("../lib/prisma.js");
const { validationResult } = require("express-validator");

async function getAllComments(req, res, next) {
    try {
        const allComments = await prisma.comment.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
        return res.send(allComments);
    } catch (err) {
        return next(err);
    }
}

async function getComments(req, res, next) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: +req.params.postId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return res.send(comments);
    } catch (err) {
        return next(err);
    }
}

async function getComment(req, res, next) {
    try {
        const comment = await prisma.post.findUnique({
            where: {
                id: +req.params.commentId,
                postId: +req.params.postId,
            },
        });
        if (!comment) {
            return res.status(404).json({ errors: ["Not found"] });
        }
        return res.send(comment);
    } catch (err) {
        return next(err);
    }
}

async function postComment(req, res, next) {
    try {
        const comment = await prisma.comment.create({
            data: {
                content: req.body.content,
                authorId: req.user ? +req.user.id : null,
                guestName: req.user ? null : req.body.guestName || null,
                postId: +req.params.postId,
            },
        });
        return res.send(comment);
    } catch (err) {
        return next(err);
    }
}

async function putComment(req, res, next) {
    try {
        const comment = await prisma.comment.update({
            where: {
                id: +req.params.postId,
            },
            data: {
                content: req.body.content,
            },
        });
        return res.send(comment);
    } catch (err) {
        return next(err);
    }
}

async function deleteComment(req, res, next) {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: +req.params.commentId,
            },
            include: {
                post: true,
            },
        });
        if (
            req.user.id != comment.post.authorId &&
            req.user.id != comment.authorId
        ) {
            return res.status(401).json({ errors: ["Unauthorized"] });
        }
        const deletedComment = await prisma.comment.delete({
            where: {
                id: +req.params.commentId,
            },
        });
        return res.send(deletedComment);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getAllComments,
    getComments,
    getComment,
    postComment,
    putComment,
    deleteComment,
};
