"use client"
import { Navbar } from './Navbar';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

export const Hero = () => {

  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

    // Función para obtener las imágenes
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/heroImages');
        const imagesData = await response.json();
        const imagePaths = imagesData.map((img: { imagePath: string }) => img.imagePath); // Extrae solo los paths
        setImages(imagePaths); // Actualiza el estado con las imágenes obtenidas
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Llama a fetchImages al montar el componente
    useEffect(() => {
      fetchImages();
    }, []);

    // Cambiar la imagen cada 5 segundos
    useEffect(() => {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFadeIn(true);
        }, 100); // Duración del fade out antes de cambiar la imagen
      }, 7000); 

      return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) return null; 

  return (
    <div className="relative w-full h-screen overflow-hidden">
    {/* Navbar */}
    <Navbar />
    {/* Image Background */}
    <img
      src={images[currentImageIndex]}
      alt="Background"
      className={`absolute top-0 left-0 w-full h-full object-cover transition-shadow duration-1000 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    />
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>



    {/* Hero Content */}
    <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
      {/* Logo */}
      <Image 
        src="/assets/logos/Logo-sin-fondo.png" 
        alt="Logo" 
        width={300}
        height={300}
        className="w-32 h-auto mb-4 md:w-48" 
      />
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4">PROJECT + BIM</h1>
      <p className="text-lg md:text-xl max-w-md mb-6">
        Creamos tus pensamientos en 3D.
      </p>
      <a
        href="#about"
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition duration-300"
      >
        Aprende más 
      </a>
    </div>
  </div>
  )
}
