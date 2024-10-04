import React from 'react'

export const Navbar = () => {
  return (
    <nav className=" p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/assets/logos/Logo-sin-fondo.png" // Cambia esta ruta a la ruta de tu imagen
            alt="Logo"
            className="h-10"
          />
          <span className="text-white text-xl font-bold ml-2">Project+BIM</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#home" className="text-white hover:text-blue-500">Home</a>
          <a href="#about" className="text-white hover:text-blue-500">About</a>
          <a href="#services" className="text-white hover:text-blue-500">Servicios</a>
          <a href="#contact" className="text-white hover:text-blue-500">Contacto</a>
        </div>
      </div>
    </nav>
  )
}
