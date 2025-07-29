import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  switch (req.method) {
    case 'PUT':
      return updateProject(req, res, slug as string);
    case 'DELETE':
      return deleteProject(req, res, slug as string);
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function updateProject(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    const { title, isActive, featured } = req.body;
    
    const newSlug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined;
    
    const project = await prisma.droneProject.update({
      where: { slug },
      data: {
        ...(title && { title, slug: newSlug }),
        ...(isActive !== undefined && { isActive }),
        ...(featured !== undefined && { featured }),
      }
    });

    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
}

async function deleteProject(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    await prisma.droneProject.delete({
      where: { slug },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
}