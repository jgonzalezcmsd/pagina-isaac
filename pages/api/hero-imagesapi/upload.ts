import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';// Ajusta la ruta según tu estructura de proyecto

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, 
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/assets/projects/hero-imagenes'),
      keepExtensions: true,
    });

    // Ignoramos `fields` porque no los estamos usando
    form.parse(req, async (err: Error | null, _fields: Fields, files: Files) => {
      if (err) {
        console.error('Error al procesar el formulario:', err);
        return res.status(500).json({ 
          error: 'Error al procesar el formulario.',
          values: {
            files: files.imagen?.[0] as formidable.File ,
          } 
        });
      }

      // Obtener el archivo de imagen
      const imagenFile = files.imagen?.[0] as formidable.File;

      // Verificar si la imagen existe
      if (!imagenFile) {
        return res.status(400).json({ error: 'Imagen no válida.' });
      }

      // Verificar tipo de archivo
      const validImageTypes = ['image/jpeg', 'image/png'];

      if (!validImageTypes.includes(imagenFile.mimetype ?? '')) {
        return res.status(400).json({
          error: 'Tipo de archivo no válido. Solo se permiten imágenes.',
        });
      }

      const oldPath = imagenFile.filepath;
      const newPath = path.join(process.cwd(), 'public/assets/projects/hero-imagenes/', imagenFile.originalFilename || 'imagen_predeterminada.jpg');

      fs.rename(oldPath, newPath, async (err) => {
        if (err) {
          console.error('Error al mover la imagen:', err);
          return res.status(500).json({ error: 'Error al guardar la imagen.' });
        }

        const imagenUrl = '/assets/projects/hero-imagenes/' + (imagenFile.originalFilename || 'imagen_predeterminada.jpg');

        try {
          // Guardar la información de la imagen en la base de datos
          const nuevaImagen = await prisma.heroImage.create({
            data: {
              imagePath: imagenUrl,
            },
          });
          res.status(201).json(nuevaImagen);
        } catch (error) {
          console.error('Error al crear la imagen en la base de datos:', error);
          res.status(500).json({ error: 'Error al crear la imagen en la base de datos' });
        }
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};

