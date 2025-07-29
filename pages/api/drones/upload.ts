import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import { Client } from 'minio';

export const config = {
  api: {
    bodyParser: false, 
  },
};

const minioClient = new Client({
  endPoint: 'storage.projectbim.cl',
  port: 9000,
  useSSL: false,
  accessKey: process.env.ACCESS_KEY!,
  secretKey: process.env.SECRET_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const form = formidable({
    keepExtensions: true,
  });

  form.parse(req, async (err: Error | null, _fields: Fields, files: Files) => {
    if (err) {
      console.error('Error processing form:', err);
      return res.status(500).json({ error: 'Error processing form.' });
    }

    const imageFile = files.image?.[0] as formidable.File;

    if (!imageFile) {
      return res.status(400).json({ error: 'No image provided.' });
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(imageFile.mimetype ?? '')) {
      return res.status(400).json({
        error: 'Invalid file type. Only images are allowed.',
      });
    }

    const fileStream = fs.createReadStream(imageFile.filepath);
    const fileName = `drone-${Date.now()}-${imageFile.originalFilename}`;
    const bucketName = 'drone-images';

    try {
      await minioClient.putObject(bucketName, fileName, fileStream, imageFile.size, {
        'Content-Type': imageFile.mimetype,
      });

      const imageUrl = `https://storage.projectbim.cl/api/v1/buckets/${bucketName}/objects/download?preview=true&prefix=${fileName}&version_id=null`;

      res.status(201).json({ url: imageUrl });
    } catch (error) {
      console.error('Error uploading to MinIO:', error);
      return res.status(500).json({ error: 'Error uploading image.' });
    }
  });
}