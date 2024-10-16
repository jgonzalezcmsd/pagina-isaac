import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import { Client } from 'minio';
import path from 'path';
import { env } from 'process';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, 
  },
};

// Configura el cliente de MinIO
const minioClient = new Client({
  endPoint: 'storage.projectbim.cl', // Cambia esto según tu configuración de MinIO
  port: 9000, // Cambia esto a 9000 si no usas SSL
  useSSL: false, // Cambia esto a false si no usas SSL
  accessKey: process.env.ACCESS_KEY!, // Tu access key de MinIO
  secretKey: process.env.SECRET_KEY!, // Tu secret key de MinIO
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({
      keepExtensions: true,
    });

    form.parse(req, async (err: Error | null, _fields: Fields, files: Files) => {
      if (err) {
        console.error('Error al procesar el formulario:', err);
        return res.status(500).json({ error: 'Error al procesar el formulario.' });
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

      // Leer el archivo y cargarlo a MinIO
      const fileStream = fs.createReadStream(imagenFile.filepath);
      const fileName = imagenFile.originalFilename || 'imagen_predeterminada.jpg';
      const bucketName = 'hero-imagenes';

      try {
        // Sube el archivo a MinIO
        await minioClient.putObject(bucketName, fileName, fileStream, imagenFile.size, {
          'Content-Type': imagenFile.mimetype,
        });

        // Genera la URL de la imagen en MinIO
        const imagenUrl = `https://storage.projectbim.cl/api/v1/buckets/${bucketName}/objects/download?preview=true&prefix=${fileName}&version_id=null`;

        // Guardar la información de la imagen en la base de datos
        const nuevaImagen = await prisma.heroImage.create({
          data: {
            imagePath: imagenUrl,
          },
        });
        res.status(201).json(nuevaImagen);
      } catch (error) {
        console.error('Error al cargar la imagen a MinIO:', error);
        return res.status(500).json({ error: 'Error al cargar la imagen a MinIO.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};
