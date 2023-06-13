const nodemailer = require("nodemailer");
// require("dotenv").config({ path: "../../../.env" });

function initialize() {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_MDP,
    },
  });
  // console.log(transporter);

  const mailOptions = {
    from: "testwcs004@gmail.com",
    to: "thomas.g.wcs@gmail.com", // adresse e-mail du destinataire
    envelope: {
      from: "testwcs004@gmail.com", // utilisé comme adresse MAIL FROM: pour SMTP
      to: "thomas.g.wcs@gmail.com", // utilisé comme adresse RCPT TO: pour SMTP
    },
    subject: "Test d'envoi d'e-mail",
    text: "Ceci est un test d'envoi d'e-mail avec Nodemailer.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line no-restricted-syntax
      console.log(error);
    } else {
      // eslint-disable-next-line no-restricted-syntax
      console.log(`E-mail envoyé : ${info.response}`);
    }
  });
}

module.exports = { initialize };
