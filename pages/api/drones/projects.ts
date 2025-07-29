import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getProjects(req, res);
    case 'POST':
      return createProject(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { featured, active, limit } = req.query;
    const take = limit ? parseInt(limit as string) : undefined;

    const where: any = {};
    if (featured === 'true') where.featured = true;
    if (active !== 'false') where.isActive = true;

    const projects = await prisma.droneProject.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { completedAt: 'desc' }
      ],
      take,
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching drone projects:', error);
    res.status(500).json({ error: 'Error fetching drone projects' });
  }
}

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      title, 
      description, 
      location, 
      area, 
      equipment, 
      deliverables, 
      featuredImage, 
      gallery, 
      completedAt, 
      clientName,
      metaTitle,
      metaDescription,
      keywords,
      featured 
    } = req.body;
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const project = await prisma.droneProject.create({
      data: {
        title,
        slug,
        description,
        location,
        area,
        equipment,
        deliverables,
        featuredImage,
        gallery: gallery ? JSON.stringify(gallery) : null,
        completedAt: completedAt ? new Date(completedAt) : null,
        clientName,
        metaTitle,
        metaDescription,
        keywords,
        featured: featured || false,
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating drone project:', error);
    res.status(500).json({ error: 'Error creating drone project' });
  }
}