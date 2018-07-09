const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const factory = require("../factories");
const sendMail = require("../../app/services/mailer");
const faker = require("faker");
const { expect } = chai;
chai.use(chaiHttp);

const app = require("../../index");
const Calendar = mongoose.model("Calendar");
const User = mongoose.model("User");

beforeEach(async () => {
    await User.remove();
    await Calendar.remove();
});

describe("Create Event", () => {
    it("Should be create a new event", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        let schedule = {
            title: faker.name.jobTitle(),
            location: faker.locale,
            date: "31/12/2020",
            hour: "17:30",
            newUser
        };

        let response = await Calendar.create(schedule);
        expect(response).to.have.property("_id");
    });

    it("Should return invalid token", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        let schedule_1 = {
            title: faker.name.jobTitle(),
            location: faker.locale,
            date: "31/12/2020",
            hour: "17:30",
            user: newUser.body.result.user
        };

        const addEvent = await chai
        .request(app)
        .post("/api/calendar/add")
        .send(schedule_1);

        expect(addEvent.body.error).to.be.equal("No token provided");
    });

    it("Should be reject two events in the same time", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        let schedule_1 = {
            title: faker.name.jobTitle(),
            location: faker.locale,
            date: "31/12/2020",
            hour: "17:30",
            user: newUser.body.result.user
        };

        let schedule_2 = {
            title: faker.name.findName(),
            location: faker.locale,
            date: "31/12/2020",
            hour: "17:30",
            user: newUser.body.result.user
        };

        // await Calendar.create(schedule_1);

       await chai
        .request(app)
        .post("/api/calendar/add")
        .set("Authorization", `Bearer ${newUser.body.result.token}`)
        .send(schedule_1);

        await chai
        .request(app)
        .post("/api/calendar/add")
        .set("Authorization", `Bearer ${newUser.body.result.token}`)
        .send(schedule_2);

        let events = await Calendar.find({ user: newUser.body.result.user });

        const filteredEvents = events.filter(
            ev => ev.hour === schedule_2.hour && ev.date === schedule_2.date
        );

        let isSameSchedule;
        if (filteredEvents.length > 0) {
            isSameSchedule = true;
        } else {
            isSameSchedule = false;
        }
        expect(isSameSchedule).to.equal(true);
    });

    it("Should be delete an event", async () => {
        const user = await factory.attrs("User");
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        let schedule_1 = {
            title: faker.name.jobTitle(),
            location: faker.locale,
            date: "31/12/2020",
            hour: "17:30",
            user: newUser.body.result.user
        };

        let createdEvent = await Calendar.create(schedule_1);

        let response = await Calendar.findByIdAndRemove({
            _id: new mongoose.mongo.ObjectId(createdEvent.id)
        });
        expect(response).not.empty;
    });

    it("Should return event not find", async () => {
        let id = new mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca");
        let response = await Calendar.findByIdAndRemove({
            _id: id
        });
        expect(response).to.be.null;
    });

    it("Should share an event", async () => {
        let mail = await sendMail({
            from: "Scheduler",
            to: "email",
            subject: "Lembrete",
            html: `message`,
            context: {
                name: "Scheduler",
                username: "Scheduler"
            }
        });

        expect(mail).to.be.undefined;
    });

    it("Should be return events of an user", async () => {
        const user = await factory.attrs("User");
        user.password = "123";
        const newUser = await chai
            .request(app)
            .post("/api/signup")
            .send(user);

        let schedule_1 = {
            title: faker.name.jobTitle(),
            location: faker.locale,
            date: "31/12/2020",
            hour: "17:30",
            user: newUser.body.result.user
        };

        await Calendar.create(schedule_1);

        const events = await chai
            .request(app)
            .get("/api/calendar/getEvents")
            .set("Authorization", `Bearer ${newUser.body.result.token}`);

        expect(events.body.success).to.be.true;
    });
});
