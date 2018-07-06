const mongoose = require("mongoose");

const User = mongoose.model("User");
const Calendar = mongoose.model("Calendar");
const sendMail = require("../services/mailer");

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

        let events = await Calendar.find({ user: user });

        const isSameSchedule = events.filter(
            ev => ev.hour === req.body.hour && ev.date === req.body.date
        );

        if (isSameSchedule.length > 0) {
            return res.status(200).json({
                success: false,
                msg: "You already have an event at this time",
                result: null
            });
        }

        let schedule = {
            ...req.body,
            user
        };

        let newSchedule = await Calendar.create(schedule);

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

    async delete(req, res, next) {
        const { id } = req.params;

        let deleteEvent = await Calendar.findByIdAndRemove({ _id: id });

        if (!deleteEvent) {
            return res.status(200).json({
                success: false,
                msg: "Event not found",
                result: null
            });
        } else if (deleteEvent.errors) {
            return res.status(200).json({
                success: false,
                msg: "The event can't be removed",
                result: null
            });
        } else {
            return res.status(200).json({
                success: true,
                msg: "Event was removed with success",
                result: null
            });
        }
    },

    async share(req, res, next) {
        try {
            const { event, email } = req.body;

            await sendMail({
                from: "Scheduler",
                to: email,
                subject: "Lembrete",
                html: `Evento ${event.title} no local ${
                    event.location
                } ocorrerá em ${event.date} às ${event.hour}.`,
                context: {
                    name: "Scheduler",
                    username: "Scheduler"
                }
            });
            return res.status(200).json({
                success: true,
                msg: "",
                result: null
            });
        } catch (error) {
            /* istanbul ignore next */
            return res.status(200).json({
                success: false,
                msg: "This event cannot be shared. Try again.",
                result: null
            });
        }
    }
};
