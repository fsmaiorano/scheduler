const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
    async update(req, res, next) {
        try {
            const { email, name, oldPassword, newPassword } = req.body;

            const user = await User.findOne({
                $or: [{ email }, { oldPassword }]
            });

            if (!user) {
                return res.status(200).json({
                    success: false,
                    msg: "User not found",
                    result: null
                });
            }

            if (await user.compareHash(oldPassword)) {
                const password = await user.updatePassword(newPassword);
                const updatedUser = await User.findByIdAndUpdate(
                    user.id,
                    { password: password, name: name },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    msg: "User updated with success",
                    result: updatedUser
                });
            } else {
                return res.status(200).json({
                    success: false,
                    msg: "Password does not match",
                    result: null
                });
            }
        } catch (error) {
            res.status(200).json({ error: "User not found" });
        }
    }
};
