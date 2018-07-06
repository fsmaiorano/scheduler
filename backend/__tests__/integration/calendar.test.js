const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const factory = require("../factories");
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

        await Calendar.create(schedule_1);

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
});
