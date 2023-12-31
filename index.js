const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send(`{msg:"zcsadsasafsa"}`);
});

app.post("/send-email", async (req, res) => {
  try {
    // const { to, subject, text } = await req.body;
    const {fullName, message, business, phone, email } = req.body;

    const emailTemplate = `
    <p>Hello Gronity,</p>
    <p>You got a new message from ${fullName}:</p>
    <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
      I am looking for ${message}. My company's business is ${business}.
      Contact me at ${phone} and ${email}
    </p>
   `;
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      // service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: process.env.USER,
      subject:message,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send("Email sent: " + info.response);
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
