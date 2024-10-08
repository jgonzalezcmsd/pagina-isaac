"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return (
      <nav
        className={`fixed w-full transition-colors duration-300 ${
          isScrolled ? "bg-gray-700" : "bg-transparent"
        } p-4 top-0 left-0 z-50`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a href="#hero">
            <div className="flex items-center">
                <Image
                  src="/assets/logos/Logo-sin-fondo.png" // Cambia esta ruta a la ruta de tu imagen
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-10"
                />
                <span className="text-white text-xl font-bold ml-2">Project+BIM</span>
              
            </div>
          </a>
          <div className="hidden md:flex space-x-4">
            <a href="#hero" className="text-white hover:text-blue-500">Home</a>
            {/* <a href="#about" className="text-white hover:text-blue-500">Acerca De Nosotros</a> */}
            <a href="#services" className="text-white hover:text-blue-500">Servicios</a>
            <a href="#projects" className="text-white hover:text-blue-500">Proyectos</a>
            <a href="#contact" className="text-white hover:text-blue-500">Contacto</a>
            <a href="/login" className="text-white hover:text-blue-500">Administrador</a>
          </div>
        </div>
      </nav>
    );
  };
  