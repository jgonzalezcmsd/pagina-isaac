"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface Proyecto {
  id: number;
  nombre: string;
  imagenUrl: string;
}

export const Projects = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('/api/projects'); // Asegúrate de tener esta API creada
        setProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);


  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.pageX - scrollRef.current.offsetLeft;
    const scrollLeft = scrollRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Ajusta la velocidad de desplazamiento
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      scrollRef.current.removeEventListener('mousemove', handleMouseMove);
      scrollRef.current.removeEventListener('mouseup', handleMouseUp);
      scrollRef.current.removeEventListener('mouseleave', handleMouseUp);
    };

    scrollRef.current.addEventListener('mousemove', handleMouseMove);
    scrollRef.current.addEventListener('mouseup', handleMouseUp);
    scrollRef.current.addEventListener('mouseleave', handleMouseUp);
  };
  return (
    
    <div className="py-20 md:py-40 xl:py-60 bg-gray-800 h-screen justify-center items-center md:justify-center md:items-center">
    <h2 className="text-3xl font-bold text-center mb-6 text-white">Nuestros Proyectos</h2>
    <div 
    ref={scrollRef}    
    className="flex {proyectos.length <5 ? justify-center : justify-between}   overflow-x-auto scrollbar-hide  scroll-container space-x-4"
    onMouseDown={handleMouseDown}
    >
      {proyectos.map((proyecto) => (
        <div key={proyecto.id} className="min-w-[400px] max-w-[400px] bg-gray-300 rounded-lg shadow-md overflow-hidden relative group ">
          <Image src={proyecto.imagenUrl} alt={proyecto.nombre} width={400} height={400} className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105" />
          <h3 className="absolute inset-0 flex items-center justify-center font-semibold text-white bg-black bg-opacity-70 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-2xl flex-wrap text-center" title="proyecto.nombre}">
            {proyecto.nombre}
          </h3>
        </div>
      ))}
    </div>
  </div>

  )
}
