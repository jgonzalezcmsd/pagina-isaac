// pages/api/usuarios.ts
import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { nombre, email, password } = req.body;

    // Validar los datos de entrada
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        name: nombre,
        email,
        password: hashedPassword, // Asegúrate de usar el campo correcto en tu modelo
      },
    });

    return res.status(201).json(newUser);
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
};

export default handler;
