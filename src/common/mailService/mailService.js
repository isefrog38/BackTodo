const {createTransport} = require('nodemailer');
const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, API_URL} = require("../config");

module.exports.MailService = async (to, link) => {
    let transporter = createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        }
    });

     transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: `Activation account from ${API_URL}`,
        text: ``,
        html:
            `
        <div>
            <h1>From Activation click for this link</h1>
            <a href="${link}">${link}</a>
        </div>
        `
    }).then(el => el)
}