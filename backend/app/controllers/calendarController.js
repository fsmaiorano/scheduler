const mongoose = require("mongoose");

const User = mongoose.model("User");
const Calendar = mongoose.model("Calendar");

module.exports = {
    async add(req, res, next) {
        let user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                success: false,
                msg: "Token invalid",
                result: null
            });
        }

        let schedule = {
            ...req.body,
            user
        }

        let newSchedule = await Calendar.create(schedule);

        if(newSchedule.errors) {
            return res.json({
                success: false,
                msg: "Outch!",
                result: newSchedule.errors
            });
        }

        return res.json({
            success: true,
            msg: "Schedule created with success",
            result: newSchedule
        });
    }
};
