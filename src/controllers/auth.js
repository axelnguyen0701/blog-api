const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const validation = require("../middleware/validate");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//POST sign-up
exports.sign_up = [
    body("username", "Must not be blank")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ username: value }).exec();
                if (user) {
                    return Promise.reject("Username already in use");
                }
            } catch (err) {
                return next(err);
            }
        }),
    body("first_name", "Must not be blank")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("last_name", "Must not be blank").trim().isLength({ min: 1 }).escape(),
    body("password", "Must not be blank").trim().isLength({ min: 1 }).escape(),
    body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            return Promise.reject("Password does not match");
        }
        return true;
    }),
    validation,
    async (req, res, next) => {
        console.log(req.body);
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 8);
            const user = {
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: hashedPassword,
            };

            const user_created = await User.create(user);
            delete user_created.password;
            const token = jwt.sign(user_created.toJSON(), "secretcode", {
                expiresIn: "10m",
            });
            return res.json({ user_created, token });
        } catch (err) {
            return next(err);
        }
    },
];

//POST login
exports.login = (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            const err = new Error("Unauthorized. User does not exist.");
            err.statusCode = 401;
            return next(err);
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), "secretcode");
            return res.json({ user, token });
        });
    })(req, res);
};
