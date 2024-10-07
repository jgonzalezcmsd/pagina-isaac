// pages/api/dashboard/proyectos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Desactivar el bodyParser por defecto para usar formidable
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Manejar la subida de proyectos
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/assets/projects/proyectos'),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error al procesar el formulario.' });
      }

      const { nombre, activo } = fields; // Obtener campos del formulario
      const imagenFile = files.imagen; // El archivo de imagen

      if (!imagenFile || !imagenFile.filepath) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen.' });
      }

      // Verifica el tipo de archivo
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(imagenFile.mimetype)) {
        return res.status(400).json({ error: 'Tipo de archivo no válido. Solo se permiten imágenes.' });
      }

      // Renombrar y mover la imagen
      const oldPath = imagenFile.filepath;
      const newPath = path.join(process.cwd(), 'public/assets/projects/proyectos', imagenFile.originalFilename);

      fs.rename(oldPath, newPath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error al guardar la imagen.' });
        }

        // Construir la URL de la imagen
        const imagenUrl = '/assets/projects/proyectos/' + imagenFile.originalFilename;

        try {
          const nuevoProyecto = await prisma.proyecto.create({
            data: {
              nombre,
              imagenUrl: imagenUrl, // Usar la URL de la imagen subida
              isActive: activo === 'true', // Convertir a booleano
            },
          });
          res.status(201).json(nuevoProyecto);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el proyecto' });
        }
      });
    });
  } else if (req.method === 'GET') {
    // Manejar la obtención de proyectos
    try {
      const proyectos = await prisma.proyecto.findMany();
      res.status(200).json(proyectos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
