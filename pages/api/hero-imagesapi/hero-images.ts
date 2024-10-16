import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Asegúrate de manejar solo los métodos que deseas permitir
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const images = await prisma.heroImage.findMany({
      select: {
        id: true,
        imagePath: true,
        isActive: true,
      },
    });

    // Si no hay imágenes, puedes devolver un mensaje apropiado
    if (!images.length) {
      return res.status(404).json({ message: 'No images found' });
    }

    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching hero images:', error);
    // Puedes personalizar el mensaje de error para evitar exponer detalles innecesarios
    res.status(500).json({ error: 'Error fetching hero images' });
  } finally {
    // Cerrar la conexión a la base de datos si es necesario
    await prisma.$disconnect();
  }
}
