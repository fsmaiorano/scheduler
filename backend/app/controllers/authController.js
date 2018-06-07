const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
    async signup(req, res, next) {
        const { email, password } = req.body;

        if (await User.findOne({ $or: [{ email }, { password }] })) {
            res.status(400).json({
                success: false,
                msg: "User already exists",
                result: null
            });
        }

        const user = await User.create(req.body);

        return res.json({
            success: true,
            msg: "User created with success",
            result: {
                user,
                token: user.generateToken()
            }
        });
    },

    async signin(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                success: false,
                msg: "User not found",
                result: null
            });
        }

        if (!(await user.compareHash(password))) {
            return res.status(400).json({
                success: false,
                msg: "Invalid password",
                result: null
            });
        }

        req.user = user;

        return res.json({
            user,
            token: user.generateToken()
        });
    }
};
