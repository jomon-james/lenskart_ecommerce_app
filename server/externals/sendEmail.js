const { Resend } = require("resend");


const resend = new Resend(process.env.resend_api_key);
const sendEmail = async (to, subject, text) => {
try {
await resend.emails.send({
  from: "onboarding@resend.dev",
  to,
  subject,
  html:`
    <div>
      <h4>${subject}</h4>
      <p>${text.replace(/\n/g, "<br>")}</p>
      </div>`,
  
});

console.log("email sent successfully");
}

catch (error) {
  console.error("Error sending email:", error);
}
};

module.exports = sendEmail;