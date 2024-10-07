"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '../ui/dialog';

const AddProjectModal = ({isOpen, onClose}) => {
    
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState<File | null>(null);
    const [activo, setActivo] = useState(true);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("nombre", nombre.toString() );
        formData.append("imagen", imagen!); // El `!` indica que no es nulo
        formData.append("activo", activo.toString());
        console.log(formData.get('imagen'));
    
        try {
          // Aquí debes hacer una petición a tu API para guardar el proyecto
          const response = await fetch("/api/dashboard/proyectos", {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            // Mostrar alerta de éxito cuando se guarde correctamente
            Swal.fire({
              icon: 'success',
              title: 'Proyecto guardado',
              text: 'El proyecto se ha guardado correctamente.',
            });
            // Limpia los estados y cierra el modal
            setNombre("");
            setImagen(null);
            setActivo(true);
            setActivo(false);
            
          } else {
            throw new Error('Error al guardar el proyecto');
          }
        } catch (error) {
          // Mostrar alerta de error si algo sale mal
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
      }
      onClose();
      
      };
    

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="p-6">
        <DialogTitle className="text-lg font-bold">Nuevo Proyecto</DialogTitle>
        <form onSubmit={handleUpload} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="nombre">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="imagen">
              Imagen
            </label>
            <input
              type="file"
              id="imagen"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files![0])}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={activo}
                onChange={(e) => setActivo(e.target.checked)}
                className="mr-2"
              />
              Activo
            </label>
          </div>
          <Button type="submit" className="bg-green-500 text-white">
            Crear Proyecto
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white ml-2"
          >
            Cancelar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProjectModal;
