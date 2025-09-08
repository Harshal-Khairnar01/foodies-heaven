import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
      port: process.env.SMTP_PORT, // 465 for SSL, 587 for TLS
      secure: process.env.SMTP_SECURE === "true", // true for 465
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // email password or app password
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Foodies Heaven" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
