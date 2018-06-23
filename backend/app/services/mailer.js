const nodemailer = require("nodemailer");
// const hbs = require('handlebars');
const htmlToText = require("html-to-text");
const fs = require("fs");
const path = require("path");
const {
    host,
    port,
    user,
    password,
    templatesPath
} = require("../../config/mail");

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user: user, pass: password }
});

module.exports = ({ template, context, ...options }) => {
    const mailHtml = options.html;

    return transport.sendMail({
        ...options,
        html: mailHtml,
        text: htmlToText.fromString(mailHtml).trim()
    });
};
