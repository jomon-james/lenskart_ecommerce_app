const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, text) => {
try {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.Email,
    pass: process.env.password,
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 15000,
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
