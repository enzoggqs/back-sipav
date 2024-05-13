import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "sipavadm@gmail.com",
    pass: "qlen tssw mdyt yjdo",
  },
});

export default transporter;
