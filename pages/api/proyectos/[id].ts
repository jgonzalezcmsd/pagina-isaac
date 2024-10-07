import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'PATCH') {
    const { isActive } = req.body;

    try {
      const updatedProyecto = await prisma.proyecto.update({
        where: { id: Number(id) },
        data: { isActive },
      });

      res.status(200).json(updatedProyecto);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Método ${method} no permitido`);
  }
}
