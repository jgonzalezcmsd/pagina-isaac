"use client";
import { useEffect, useState } from 'react'; 
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import Swal from 'sweetalert2';


const EditProjectModal = ({ project, isOpen, onClose }) => {
  const [nombre, setNombre] = useState(project.nombre);
  const [imagen, setImagen] = useState<File | null>(null);
  const [activo, setActivo] = useState(project.isActive);

  const formData = new FormData();

  console.log(project);

  // Efecto para restablecer los valores cuando se abre el modal
  useEffect(() => {
    if (isOpen && project) {
      setNombre(project.nombre);
      setImagen(null); // Puedes establecer una lógica si necesitas mantener la imagen
      setActivo(project.isActive);
    }
  }, [isOpen, project]);
  

  const handleUpdateProject = async () => {
    
    formData.append("nombre", nombre);
    formData.append("imagen", imagen!); // El `!` indica que no es nulo
    formData.append("activo", activo);
    formData.append("id", project.id); 
    try {
      
      const response = await fetch('/api/proyectos/editProject', {
        method: 'PUT',
        body:formData,
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el proyecto');
      }

      const data = await response.json();
      console.log('Proyecto actualizado:', data);
      setNombre('');
      setImagen(null);
      setActivo(false);
      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Proyecto guardado',
        text: 'El proyecto se ha guardado correctamente.',
      })
      onClose();
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
      <DialogContent className="fixed top-1/2 left-1/2 w-1/3 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
        <DialogTitle className="text-lg font-bold">Editar Proyecto</DialogTitle>
        <div className="mt-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded p-2 w-full"
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
        <div className="mt-4">
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
        <div className="mt-4">
          <Button onClick={handleUpdateProject} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</Button>
          <Button onClick={onClose} className="ml-2 bg-red-600 px-4 py-2 rounded">Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;

