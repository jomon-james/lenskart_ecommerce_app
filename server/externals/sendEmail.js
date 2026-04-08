const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, text) => {
try {
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jomonjames118@gmail.com",
    pass: "cvlsnyqwznosvyfe",
  },
});

const mailOptions = {
  from: 'jomonjames118@gmail.com',
  to,
  subject,
  text,
};

await transporter.sendMail(mailOptions);
console.log("email sent successfully");
}

catch (error) {
  console.error("Error sending email:", error);
}
};

module.exports = sendEmail;
