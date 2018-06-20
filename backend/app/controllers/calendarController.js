const mongoose = require("mongoose");

const User = mongoose.model("User");
const Calendar = mongoose.model("Calendar");

module.exports = {
    async add(req, res, next) {
        let user = await User.findById(req.userId);

        if (!user) {
            return res.status(200).json({
                success: false,
                msg: "Token invalid",
                result: null
            });
        }

        let schedule = {
            ...req.body,
            user
        };

        let newSchedule = await Calendar.create(schedule);

        if (newSchedule.errors) {
            return res.status(200).json({
                success: false,
                msg: "Outch!",
                result: newSchedule.errors
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Schedule created with success",
            result: newSchedule
        });
    },

    async getEvents(req, res, next) {
        let user = await User.findById(req.userId);

        if (!user) {
            return res.status(200).json({
                success: false,
                msg: "Token invalid",
                result: null
            });
        }

        let events = await Calendar.find({ user: user });

        return res.status(200).json({
            success: true,
            msg: `Event of ${user.name}`,
            result: events
        });
    },

    async delete(req,res,next){
        const { id } = req.params;

        let deleteEvent = await Calendar.findByIdAndRemove({ _id: id });

        if(!deleteEvent){
            return res.status(200).json({
                success: false,
                msg: "Event not found",
                result: null
            });
        }
        else if(deleteEvent.errors) {
            return res.status(200).json({
                success: false,
                msg: "The event can't be removed",
                result: null
            });
        }
        else {
            return res.status(200).json({
                success: true,
                msg: "Event was removed with success",
                result: null
            });
        }
    }
};
