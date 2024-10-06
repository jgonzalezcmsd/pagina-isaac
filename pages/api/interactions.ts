import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, company, message } = req.body;

    try {
      // Primero, verifica si el contacto ya existe
      let contacto = await prisma.contacto.findUnique({
        where: { email },
      });

      // Si no existe, créalo
      if (!contacto) {
        // Verifica si la empresa ya existe
        let empresa = await prisma.empresa.findUnique({
          where: { nombre: company }, // O cualquier otro campo único
        });

        // Si no existe la empresa, créala
        if (!empresa) {
          empresa = await prisma.empresa.create({
            data: {
              nombre: company,
              // Puedes agregar más datos de la empresa si tienes
            },
          });
        }

        // Crea el contacto asociando la empresa
        contacto = await prisma.contacto.create({
          data: {
            nombre: name,
            email: email,
            telefono: phone,
            empresaId: empresa.id, // Asocia la empresa al contacto
          },
        });
      }

      // Guarda la interacción
      const interaccion = await prisma.interaccion.create({
        data: {
          tipo: 'contacto', // Ajusta el tipo según sea necesario
          contactoId: contacto.id,
          // Guarda el mensaje como una nueva entrada en Mensaje
          mensajes: {
            create: { texto: message }, // Asegúrate de que la propiedad sea correcta
          },
        },
      });

      return res.status(201).json({ contacto, interaccion });
    } catch (error) {
      console.error('Error guardando la interacción:', error);
      return res.status(500).json({ error: 'Error guardando la interacción' });
    }
  } else {
    // Manejo de métodos HTTP no permitidos
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
