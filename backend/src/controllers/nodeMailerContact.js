const nodemailer = require("nodemailer");

function initialize(req, res) {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_MDP,
    },
  });

  const mailOptions = {
    from: "testwcs004@gmail.com",
    to: "testwcs004@gmail.com", // adresse e-mail du destinataire
    envelope: {
      from: email, // utilisé comme adresse MAIL FROM: pour SMTP
      to: "testwcs004@gmail.com", // utilisé comme adresse RCPT TO: pour SMTP
    },
    subject: "Contact Client",
    text: `Vous avez reçu un message de : ${name}, avec le message suivant : " ${message} "`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else if (info !== null) res.sendStatus(200);
  });
}

function welcomeMessage(req, res) {
  const { name, email } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_MDP,
    },
  });

  const mailOptions = {
    from: "testwcs004@gmail.com",
    to: email, // adresse e-mail du destinataire
    envelope: {
      from: "testwcs004@gmail.com", // utilisé comme adresse MAIL FROM: pour SMTP
      to: email, // utilisé comme adresse RCPT TO: pour SMTP
    },
    subject: "Contact Client",
    text: `Merci pour votre inscription ${name}, avec les identifiants suivant : ${email} "`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else if (info !== null) res.sendStatus(200);
  });
}

module.exports = { initialize, welcomeMessage };
