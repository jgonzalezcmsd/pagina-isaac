"use client";
import { Switch } from '@/components/ui/switch';
import React, { useEffect, useState } from 'react';
import UploadImageDialog from '../../../../components/maintainer/uploadImageModal';
import 'animate.css';

const Page = () => {
    const [images, setImages] = useState([]);

    // Simulación de la carga de datos desde la API
    useEffect(() => {
      const fetchImages = async () => {
        const response = await fetch('/api/hero-imagesapi/hero-images');
        const data = await response.json();
        setImages(data);
      };
      fetchImages();
    }, []);
  
    // Manejar el cambio de estado de la imagen
    const handleToggle = async (image: any) => {
        console.log(image)
        try {
          // Realiza la llamada a la API para cambiar el estado de la imagen
          const response = await fetch(`/api/hero-imagesapi/${image.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({                 
                id: image.id,
                isActive: !image.isActive 
            }),
          });
      
          if (response.ok) {
            // Actualizamos el estado localmente si la petición es exitosa
            setImages((prevImages: any) =>
              prevImages.map((img: any) =>
                img.id === image.id ? { ...img, isActive: !img.isActive } : img
              )
            );
          } else {
            throw new Error('No se pudo actualizar el estado de la imagen');
          }
        } catch (error) {
          console.error('Error al actualizar la imagen:', error);
        }
    };

    // Función para actualizar las imágenes después de la carga
    const handleImageUpload = async () => {
        const response = await fetch('/api/hero-imagesapi/hero-images');
        const data = await response.json();
        setImages(data); // Actualiza las imágenes
    };

      

  return (
    <div className="p-10min-h-screen">
    <h1 className="text-3xl font-bold mb-8 text-white">Administrar Imágenes de Cabecera</h1>
    <div className='py-3'>
        <UploadImageDialog 
            onUploadSuccess={handleImageUpload}
        />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeIn">
      {images.map((image: any) => (
        <div key={image.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 relative">
          <img
            src={image.imagePath}
            alt={image.title || 'Imagen de Hero'}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="mt-4">
            <div className="flex items-center mt-4">
              <span className="mr-2 text-gray-700">
                {image.isActive ? 'Activo' : 'Inactivo'}
              </span>
              <Switch
                checked={image.isActive}
                onClick={() => handleToggle(image)}
                className={`${
                    image.isActive ? 'bg-green-500' : 'bg-gray-300'
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                >
                <span
                    className={`${
                    image.isActive ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
            </Switch>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Page;
