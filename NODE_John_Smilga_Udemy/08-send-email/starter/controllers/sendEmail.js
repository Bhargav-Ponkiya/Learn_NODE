const nodemailer = require("nodemailer");

// NOTE: Below was just for TESTING environment. In PRODUCTION we should/need to add cred in .env file for security purpose.
// Also, we need to integrate proper email service provide for PRODUCTION

// "Ethereal" is a temporary, in-memory email service primarily used for
// testing email functionality within your application

// Ethereal is designed for testing email functionality in development by
// providing temporary email addresses and inboxes to quickly check if emails are being sent correctly

const sendEmail = async (req, res) => {
  // if we don't have fake account, we can create it using below method and use it for user and pass in transporter
  // const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "mack.brekke@ethereal.email",
      pass: "Kk4G3vt2pTJ1TzACx3",
    },
  });

  const info = await transporter.sendMail({
    from: '"Mack Brekke" <mack.brekke@ethereal.email>',
    to: "bar@example.com",
    subject: "Hello",
    html: "<h2>Sending Emails with Node.js: nodemailer and service provider - ethereal</h2>",
  });

  res.json(info);
};

module.exports = sendEmail;
