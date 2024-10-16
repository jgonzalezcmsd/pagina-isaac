import React from 'react'
import Image from 'next/image';
import { InstagramLogoIcon } from '@radix-ui/react-icons';

export const Footer = () => {
  return (
    <footer className="justify-center items-center bg-gray-900 text-white py-6 ">
    <div className="container mx-auto flex flex-col items-center">
      {/* Logo centrado */}
      <Image src="/assets/logos/Logo-sin-fondo.png" alt="Logo" 
      width={100} height={100}
      className="w-32 h-auto mb-4" 
      />
      
      <div className="text-center mb-4">
        <h5 className="text-lg font-bold">Project + BIM</h5>
        <p className="text-sm">Creando soluciones para tus proyectos en 3D</p>
      </div>
      
      {/* Enlaces de navegación */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <a href="#about" className="hover:underline">Sobre Nosotros</a>
        <a href="#services" className="hover:underline">Servicios</a>
        <a href="#contact" className="hover:underline">Contacto</a>
      </div>
      
      {/* Redes sociales */}
      <div className="flex space-x-4 mb-4">
        <a href="#" className="hover:text-blue-500">
          <i className="fab fa-facebook"></i> {/* Facebook icon */}
        </a>
        <a href="#" className="hover:text-blue-500">
          <i className="fab fa-twitter"></i> {/* Twitter icon */}
        </a>
        <a href="#" className="hover:text-blue-500">
          <i className="fab fa-instagram"></i> {/* Instagram icon */}
        </a>
      </div>
    </div>

    {/* Copyright */}
    <div className="text-center  ">
      <p className="text-sm">© {new Date().getFullYear()} Project + BIM. Todos los derechos reservados.</p>
      <span className="text-sm mr-2">Página diseñada por </span>
      <span className="text-sm font-semibold">Jose Gonzalez</span>
      <div className="flex justify-center items-center mt-2">
        <a
          href="https://www.instagram.com/pancitofotografia/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-blue-300 transition-colors"
        >
          <InstagramLogoIcon />
          <span className="ml-1 text-sm">pancitofotografia</span>
        </a>
      </div>      
    </div>
  </footer>
  )
}
