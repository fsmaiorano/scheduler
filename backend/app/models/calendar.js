const mongoose = require("mongoose");

const Calendar = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    hour: {
        type: String,
        require: true
    },
    user: {
        ref: "User",
        type: mongoose.Schema.ObjectId,
        require: true
    }
});

mongoose.model("Calendar", Calendar);
