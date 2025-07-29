import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getServices(req, res);
    case 'POST':
      return createService(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getServices(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { featured, active, limit } = req.query;
    const take = limit ? parseInt(limit as string) : undefined;

    const where: any = {};
    if (featured === 'true') where.featured = true;
    if (active !== 'false') where.isActive = true;

    const services = await prisma.droneService.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      take,
    });

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching drone services:', error);
    res.status(500).json({ error: 'Error fetching drone services' });
  }
}

async function createService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      title, 
      description, 
      shortDescription, 
      featuredImage, 
      gallery, 
      price, 
      duration, 
      equipment, 
      deliverables,
      metaTitle,
      metaDescription,
      keywords,
      featured 
    } = req.body;
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const service = await prisma.droneService.create({
      data: {
        title,
        slug,
        description,
        shortDescription,
        featuredImage,
        gallery: gallery ? JSON.stringify(gallery) : null,
        price,
        duration,
        equipment,
        deliverables,
        metaTitle,
        metaDescription,
        keywords,
        featured: featured || false,
      }
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating drone service:', error);
    res.status(500).json({ error: 'Error creating drone service' });
  }
}