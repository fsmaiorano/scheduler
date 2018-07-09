const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const factory = require("../factories");
const sendMail = require("../../app/services/mailer");
const faker = require("faker");
const { expect } = chai;
chai.use(chaiHttp);
const app = require("../../index");
const User = mongoose.model("User");

beforeEach(async () => {
    await User.remove();
});

describe("User Profile", () => {
    it("Should update user profile", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        const email = newUser.email;
        const oldPassword = newUser.password;

        const searchUser = await User.findOne({
            $or: [{ email }, { oldPassword }]
        });

        newUser.body.result.user.email = searchUser.email;
        newUser.body.result.user.name = "newName";
        newUser.body.result.user.oldPassword = searchUser.password;
        newUser.body.result.user.newPassword = "novoPassword";

        let password = await searchUser.updatePassword(
            newUser.body.result.user.newPassword
        );

        const updatedUser = await User.findByIdAndUpdate(
            searchUser.id,
            { password: password, name: newUser.body.result.user.name },
            { new: true }
        );

        expect(updatedUser.password).to.be.equal(password);
    });

    it("Should return user not found", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        const userUpdate = await chai
            .request(app)
            .post("/api/update")
            .set("Authorization", `Bearer ${newUser.body.result.token}`)
            .send(newUser.body.result.user);

        expect(userUpdate.body.error).to.be.equal("User not found");
    });

    it("Should return password not match", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        const email = newUser.email;
        const oldPassword = newUser.password;

        const searchUser = await User.findOne({
            $or: [{ email }, { oldPassword }]
        });

        newUser.body.result.user.email = searchUser.email;
        newUser.body.result.user.oldPassword = searchUser.password;
        newUser.body.result.user.newPassword = "111";

        const userUpdate = await chai
            .request(app)
            .post("/api/update")
            .set("Authorization", `Bearer ${newUser.body.result.token}`)
            .send(newUser.body.result.user);

        let passwordMatch = await searchUser.compareHash(
            "dasjdklasjdklasjkldjsak"
        );

        expect(userUpdate.body.success).to.be.false;
        expect(userUpdate.body.msg).to.be.equal("Password does not match");
        expect(passwordMatch).to.be.false;
    });
});
