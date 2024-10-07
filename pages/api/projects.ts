// pages/api/proyectos.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const proyectos = await prisma.proyecto.findMany(
        {
          where: { isActive: true },
        }
      );
      res.status(200).json(proyectos);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      res.status(500).json({ error: "Error al obtener proyectos" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
