// utils/imageHelper.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getActiveHeroImages = async () => {
  try {
    const images = await prisma.heroImage.findMany({
      where: { isActive: true },
    });
    return images.map((image) => image.imagePath); // Asegúrate de que 'imagePath' sea el campo correcto en tu modelo
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};
