require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send-code", async (req, res) => {
  const { email, code } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Jongo Pass Verification Code",
      text: `Your verification code is: ${code}`
    });

    res.json({ success: true, message: "Code sent!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});