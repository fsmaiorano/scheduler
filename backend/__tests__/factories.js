const mongoose = require('mongoose');
const factoryGirl = require('factory-girl');
const faker = require('faker');

const { factory } = factoryGirl;

factory.setAdapter(new factoryGirl.MongooseAdapter());

// User
factory.define('User', mongoose.model('User'), {
  name: faker.name.findName(),
  username: factory.seq('User.username', x => `user_${x}`),
  email: factory.seq('User.email', x => `user_${x}@email.com`),
  password: faker.internet.password(),
});

factory.define('Calendar', mongoose.model('Calendar'), {
    "title": faker.name.jobTitle(),
    "location": faker.locale,
    "date": faker.date.future(),
    "hour": "17:30"
});

// factory.define('Calendar', mongoose.model('Calendar'), {
//   title: faker.lorem.sentence(),
//   location: faker.lorem.sentence(),
//   date: '01/01/2018',
//   hour: '01:00',
//   user: factory.assoc('User', '_id'), // Create user and recover _id
// });

module.exports = factory;
