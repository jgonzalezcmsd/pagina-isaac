// pages/api/dashboard/proyectos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/assets/projects/proyectos'),
      keepExtensions: true,
    });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error al procesar el formulario:', err); // Log del error
        return res.status(500).json({ error: 'Error al procesar el formulario.' });
      }

      const { nombre, activo } = fields;
      const imagenFile = files.imagen?.[0] as formidable.File;


      // Verificar campos
      if (!nombre || !imagenFile || !imagenFile ) {
        return res.status(400).json({ 
          error: 'Nombre o imagen no válidos.', 
          values: { 
            nombre,
            imagenFile 
          },
        });
      }

      // Verificar tipo de archivo
      const validImageTypes = ['image/jpeg', 'image/png'];

      if (!validImageTypes.includes(imagenFile.mimetype ?? '')) {
        return res.status(400).json({ 
          error: 'Tipo de archivo no válido. Solo se permiten imágenes.',
          values: {
            imagenFile
          } 
        });
      }

      const oldPath = imagenFile.filepath;
      const newPath = path.join(process.cwd(), 'public/assets/projects/proyectos/', imagenFile.originalFilename || 'imagen_predeterminada.jpg');

      fs.rename(oldPath, newPath, async (err) => {
        if (err) {
          console.error('Error al mover la imagen:', err); // Log del error
          return res.status(500).json({ error: 'Error al guardar la imagen.' });
        }

        const imagenUrl = '/assets/projects/proyectos/' + (imagenFile.originalFilename || 'imagen_predeterminada.jpg');

        try {
          const nuevoProyecto = await prisma.proyecto.create({
            data: {
              nombre: nombre[0] ,
              imagenUrl,
              isActive: activo[0] === 'true',
            },
          });
          res.status(201).json(nuevoProyecto);
        } catch (error) {
          console.error('Error al crear el proyecto:', error); // Log del error
          res.status(500).json({ error: 'Error al crear el proyecto' });
        }
      });
    });
  } else if (req.method === 'GET') {
    try {
      const proyectos = await prisma.proyecto.findMany();
      res.status(200).json(proyectos);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error); // Log del error
      res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
