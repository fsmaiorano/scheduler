const path = require('path');

module.exports = {
  // Auth
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,

  // Template
//   templatesPath: path.resolve('./resources/mail'),
};
