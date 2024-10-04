// pages/api/hero-images.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const images = await prisma.heroImage.findMany({
      where: { isActive: true },
      select: { imagePath: true },
    });
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching hero images:", error);
    res.status(500).json({ error: "Error fetching hero images" });
  }
}
