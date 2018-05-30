const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
    async signup(req, res, next) {
        console.log("passei");
        return res.send("teste");
    }
};
