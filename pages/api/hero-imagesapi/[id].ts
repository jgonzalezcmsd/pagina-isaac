import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { isActive } = req.body;

    try {
      const updatedImage = await prisma.heroImage.update({
        where: {
          id: parseInt(id),
        },
        data: {
          isActive,
        },
      });
      res.status(200).json(updatedImage);
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
      res.status(500).json({ error: 'Error al actualizar la imagen' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
