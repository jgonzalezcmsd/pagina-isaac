import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PlusIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UploadImageDialog = ({onUploadSuccess}) => {
  const [imagen, setImagen] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false); 
  
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
    
    if (!imagen) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona una imagen.',
      });
      return;
    }
    console.log(imagen);
    formData.append("imagen", imagen!);
    console.log('formData',formData.get('imagen'));

    try {
      const response = await fetch('/api/hero-imagesapi/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Imagen Guardada',
          text: 'La imagen se ha guardado.',
        });
        setImagen(null);
        onUploadSuccess(); 
        
         // Reinicia el estado de la imagen
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.error || 'Error al subir la imagen.',
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema en la conexión.',
      });
    }
    setIsOpen(false);
    
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition">
            <PlusIcon className="w-5 h-5" />
            Subir Imagen
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-md w-full p-6 rounded-lg shadow-lg bg-white">
          <DialogTitle>Subir Nueva Imagen</DialogTitle>
          <DialogDescription>
            Complete la información para subir una nueva imagen.
          </DialogDescription>

          <form className="space-y-4 mt-4" onSubmit={handleUpload}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen</label>
              <input
                type="file"
                id="imagen"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files![0])}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Subir Imagen
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadImageDialog;
