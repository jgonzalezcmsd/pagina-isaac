import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getCotizaciones(req, res);
    case 'POST':
      return createCotizacion(req, res);
    case 'PUT':
      return updateCotizacion(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getCotizaciones(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cotizaciones = await prisma.cotizacion.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(cotizaciones);
  } catch (error) {
    console.error('Error fetching cotizaciones:', error);
    res.status(500).json({ error: 'Error fetching cotizaciones' });
  }
}

async function createCotizacion(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      nombre, 
      email, 
      telefono, 
      empresa, 
      servicio, 
      descripcion, 
      ubicacion, 
      area, 
      presupuesto, 
      fechaRequerida 
    } = req.body;
    
    const cotizacion = await prisma.cotizacion.create({
      data: {
        nombre,
        email,
        telefono,
        empresa,
        servicio,
        descripcion,
        ubicacion,
        area,
        presupuesto,
        fechaRequerida: fechaRequerida ? new Date(fechaRequerida) : null
      }
    });

    res.status(201).json(cotizacion);
  } catch (error) {
    console.error('Error creating cotizacion:', error);
    res.status(500).json({ error: 'Error creating cotizacion' });
  }
}

async function updateCotizacion(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, estado, notas } = req.body;
    
    const cotizacion = await prisma.cotizacion.update({
      where: { id },
      data: { estado, notas }
    });

    res.status(200).json(cotizacion);
  } catch (error) {
    console.error('Error updating cotizacion:', error);
    res.status(500).json({ error: 'Error updating cotizacion' });
  }
}