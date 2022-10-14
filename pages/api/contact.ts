import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const generateMailBody = (name: string, message: string) => `
<h1>Új üzenet érkezett a Forródróton keresztül:</h1>
<p><b>Név:</b> ${name}</p>

p><b>Üzenet:</b> ${message}</p>
`;

interface Response {
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const options = {
    from: req.body.email,
    to: process.env.GMAIL_USER,
    subject: req.body.subject,
    html: generateMailBody(req.body.name, req.body.message),
  };

  try {
    await transporter.sendMail(options);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
}
