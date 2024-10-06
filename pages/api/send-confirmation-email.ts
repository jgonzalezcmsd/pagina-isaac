// pages/api/send-confirmation-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name } = req.body;

    // Configura el transportador de correo
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ovh.ca', // Dirección de tu servidor SMTP
      port: 587, // o el puerto que uses
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER, // Tu usuario SMTP
        pass: process.env.EMAIL_PASS, // Tu contraseña SMTP
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmación de Contacto',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
          <h2 style="color: #007bff;">Hola ${name},</h2>
          <p>Gracias por contactarte con nosotros. Nos pondremos en contacto contigo usando la información proporcionada.</p>
          <p>Saludos,<br />
          Tu Equipo</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Correo enviado' });
    } catch (error) {
      console.error('Error enviando el correo:', error);
      res.status(500).json({ error: 'Error enviando el correo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
