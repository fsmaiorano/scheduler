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
                res.status(400).json({ error: "User not found" });
            }

            if (await user.compareHash(oldPassword)) {
                const password = await user.updatePassword(newPassword);
                const updatedUser = await User.findByIdAndUpdate(
                    user.id,
                    { password: password, name: name },
                    { new: true }
                );
                res.status(200).json(updatedUser);
            } else {
                res.status(400).json({ error: "Password does not match" });
            }
        } catch (error) {
            res.status(400).json({ error: "User not found" });
        }
    }
};
