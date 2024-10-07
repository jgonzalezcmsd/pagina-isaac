import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo aceptaremos el método GET para esta API
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Obtener todos los contactos con relaciones a empresa, usuario e interacciones
    const contactos = await prisma.contacto.findMany({
      include: {
        empresa: {
          select: {
            nombre: true,
          },
        },
        Interaccion: {
          include: {
            mensajes: true,
          },
        },
      },
    });

    // Enviar los contactos obtenidos en la respuesta
    res.status(200).json(contactos);
  } catch (error) {
    console.error("Error fetching contactos:", error);
    res.status(500).json({ error: "Error al obtener los contactos" });
  }
}
