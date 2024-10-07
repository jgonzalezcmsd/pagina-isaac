// pages/api/editProject.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Desactivar el bodyParser por defecto para usar formidable
  },
};

const editProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/assets/projects/proyectos'),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error al procesar el formulario.' });
      }

      const { id, nombre, activo } = fields; // Obtener campos del formulario
      const imagenFile = files.imagen?.[0] as formidable.File;

      // Validar los datos
      if (!id || !nombre) {
        return res.status(400).json({ error: 'ID y nombre son requeridos.' });
      }

      try {
        // Busca el proyecto en la base de datos
        const project = await prisma.proyecto.findUnique({ where: { 
            id: parseInt(id[0]), 
          } 
        });
        if (!project) {
          return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }

        let imagenUrl = project.imagenUrl; // Conservar la URL existente

        // Si se subió una nueva imagen, manejar la actualización de la imagen
        if (imagenFile && imagenFile.filepath) {
          // Verifica el tipo de archivo
          const validImageTypes = ['image/jpeg', 'image/png'];

          if (!validImageTypes.includes(imagenFile.mimetype ?? '')) {
            return res.status(400).json({ error: 'Tipo de archivo no válido. Solo se permiten imágenes.' });
          }

          // Renombrar y mover la imagen
          const oldPath = imagenFile.filepath;
          const newPath = path.join(process.cwd(), 'public/assets/projects/proyectos', imagenFile.originalFilename);

          await fs.promises.rename(oldPath, newPath); // Mover la imagen
          imagenUrl = '/assets/projects/proyectos/' + imagenFile.originalFilename; // Actualizar la URL de la imagen
        }

        // Actualiza el proyecto
        const updatedProject = await prisma.proyecto.update({
          where:{ 
                id: Number(id[0]), 
            },
            data: {
                nombre: nombre.toString(),
                imagenUrl,
                isActive: activo[0] === 'true',
            },
        });

        return res.status(200).json(updatedProject);
      } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        return res.status(500).json({ error: 'Error al actualizar el proyecto.' });
      }
    });
  } else {
    // Maneja cualquier otro método
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
};

export default editProjectHandler;
