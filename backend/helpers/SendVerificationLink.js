import nodemailer from 'nodemailer'
import { config } from 'dotenv';

config();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'noreply@hari-acharya.com.np',
    pass: process.env.EMAIL_PASSWORD.toString()
  }
});

export default async function sendVerificationLink(email, token, type) {
  if (type == "password") {
    const isSent = await passwordResetEmail(email, token);
    return isSent;
  } else if (type == "email") {
    const isSent = await verifyEmail(email, token);
    return isSent;
  }
  return false;
}

async function passwordResetEmail(email, token) {

  const mailOptions = {
    from: 'noreply@hari-acharya.com.np',
    to: email,
    subject: 'Password Rest - MyTodoApp',
    replyTo: 'noreply@hari-acharya.com.np',
    html: `
    <h1>MyTodoApp</h1>
    <br/>
    <p> Please click the following link to reset your password. </p>
    <br/>
    <a href="${process.env.FRONTEND_URL.toString()}/auth/reset?token=${encodeURIComponent(token)}">Rest password</a>
    <span>This email is not monitored, please do not reply to this email. </span>
    `
  }
  await transporter.sendMail(mailOptions);
  
}

async function verifyEmail(email, token) {
  
  const mailOptions = {
    from: 'noreply@hari-acharya.com.np',
    to: email,
    subject: 'Verify Email - MyTodoApp',
    replyTo: 'noreply@hari-acharya.com.np',
    html: `
    <h1>MyTodoApp</h1>
    <br/>
    <p> Please click the following link to verify your email. </p>
    <br/>
    <a href="${process.env.FRONTEND_URL.toString()}/auth/verify?token=${encodeURIComponent(token)}">Verify Email</a>
    <span>This email is not monitored, please do not reply to this email. </span>
    `
  }
  await transporter.sendMail(mailOptions);
}

