import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  switch (req.method) {
    case 'PUT':
      return updateService(req, res, slug as string);
    case 'DELETE':
      return deleteService(req, res, slug as string);
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function updateService(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    const { title, isActive, featured } = req.body;
    
    const newSlug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined;
    
    const service = await prisma.droneService.update({
      where: { slug },
      data: {
        ...(title && { title, slug: newSlug }),
        ...(isActive !== undefined && { isActive }),
        ...(featured !== undefined && { featured }),
      }
    });

    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Error updating service' });
  }
}

async function deleteService(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    await prisma.droneService.delete({
      where: { slug },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Error deleting service' });
  }
}