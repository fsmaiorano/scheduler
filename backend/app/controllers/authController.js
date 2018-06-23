const mongoose = require("mongoose");

const User = mongoose.model("User");
const sendMail = require('../services/mailer');

module.exports = {
    async signup(req, res, next) {
        const { email, name, username } = req.body;

        if (await User.findOne({ email })) {
            return res.status(200).json({
                success: false,
                msg: "User already exists",
                result: null
            });
        }

        const user = await User.create(req.body);

        sendMail({
            from: "Scheduler",
            to: email,
            subject: `Bem vindo, ${name}`,
            html: "Sua conta foi criada com sucesso! Seja bem vindo!",
            //template: 'auth/register',
            context: {
                name: name,
                username: username
            }
        });

        return res.json({
            success: true,
            msg: "User created with success",
            result: {
                user: user,
                token: user.generateToken()
            }
        });
    },

    async signin(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({
                success: false,
                msg: "User not found",
                result: null
            });
        }

        if (!(await user.compareHash(password))) {
            return res.status(200).json({
                success: false,
                msg: "Invalid password",
                result: null
            });
        }

        req.user = user;

        return res.json({
            success: true,
            msg: "User logged",
            result: {
                user,
                token: user.generateToken()
            }
        });
    }
};
