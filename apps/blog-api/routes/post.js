const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");
const auth = require("../middleware/auth");
const validator = require("../middleware/validators");
const commentRouter = require("./comment");
const draftRouter = require("./draft");
const commentController = require("../controllers/comment");

// merge in drafts router
router.use("/drafts", draftRouter);

// Merge in comments router
router.use("/:postId/comments", commentRouter);

// get all posts
router.get("/", controller.getPosts);

// get all comments
router.get("/comments", commentController.getAllComments);

// get single post by id
router.get("/:postId", controller.getPost);

// create a post after checking authorization (draft or published?)
router.post(
    "/",
    auth.requireAuth,
    auth.requireAuthor,
    validator.validatePostTitle,
    validator.validatePostContent,
    validator.validationResults,
    controller.postPost,
);

// edit a post after checking authorization
router.put(
    "/:postId",
    auth.requireAuth,
    auth.requireAuthor,
    auth.requireSameAuthor,
    validator.validatePostTitleOptional,
    validator.validationResults,
    controller.putPost,
);

// delete a post after checking authorization
router.delete(
    "/:postId",
    auth.requireAuth,
    auth.requireAuthor,
    auth.requireSameAuthor,
    controller.deletePost,
);

module.exports = router;
