const { body, validationResult } = require("express-validator");

const validateUsername = [
    body("username").trim().notEmpty().toLowerCase().escape(),
];
const validatePassword = [body("password").notEmpty().isStrongPassword()];
const validateUsernameOptional = [
    body("username").trim().notEmpty().toLowerCase().escape().optional(),
];
const validatePasswordOptional = [
    body("password").notEmpty().isStrongPassword().optional(),
];
const validatePostTitle = [body("title").trim().notEmpty().escape()];
const validatePostContent = [body("content").optional()];
const validatePostTitleOptional = [
    body("title").trim().notEmpty().escape().optional(),
];
const validateComment = [body("content").trim().notEmpty().escape()];

function validationResults(req, res, next) {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array() });
    }
    next();
}

module.exports = {
    validatePassword,
    validatePasswordOptional,
    validateUsername,
    validateUsernameOptional,
    validatePostTitle,
    validatePostContent,
    validatePostTitleOptional,
    validateComment,
    validationResults,
};
