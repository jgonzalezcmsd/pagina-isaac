// /pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        // Buscar el usuario por email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Verificar si el usuario existe y si la contraseña coincide
        if (!user || !user.password) {
          throw new Error('No user found with the given email');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin', // Puedes personalizar esta página
    error: '/auth/error', // Página de error para errores de autenticación
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario se autentica correctamente, se agrega el ID del usuario al token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Agregar datos adicionales a la sesión del usuario
      if (token) {
        session.user.id = token.id; // Agrega el ID del usuario a la sesión
      }
      return session;
    },
  },
});
