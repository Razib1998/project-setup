import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // true for port 465, false for other ports
    auth: {
      user: "mdrajibsorkar965@gmail.com",
      pass: "tliv tdfg szhe zlmq",
    },
  });
  await transporter.sendMail({
    from: "mdrajibsorkar965@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset password link", // Subject line
    text: "Change your password within 10m!!!", // plain text body
    html, // html body
  });
};
