// pages/proyectos.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Asegúrate de tener el botón de ShadCN

interface Proyecto {
  id: number;
  nombre: string;
  imagenUrl: string;
  isActive: boolean;
}

const Proyectos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [activo, setActivo] = useState(true);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  // Función para obtener la lista de proyectos
  const fetchProyectos = async () => {
    try {
      const response = await fetch("/api/dashboard/proyectos");
      if (!response.ok) {
        throw new Error("Error al obtener los proyectos");
      }
      const data = await response.json();
      setProyectos(data); // Almacena los proyectos en el estado
    } catch (error) {
      console.error(error);
    }
  };

  // Llamar a la función fetchProyectos cuando el componente se monte
  useEffect(() => {
    fetchProyectos();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("imagen", imagen!); // El `!` indica que no es nulo
    formData.append("activo", activo.toString());

    // Aquí debes hacer una petición a tu API para guardar el proyecto
    await fetch("/api/dashboard/proyectos", {
      method: "POST",
      body: formData,
    });

    // Limpia los estados y cierra el modal
    setNombre("");
    setImagen(null);
    setActivo(true);
    setIsOpen(false);

    // Opcional: redirigir o actualizar la lista de proyectos
    fetchProyectos(); // Vuelve a obtener la lista de proyectos
  };

  const handleToggleActive = async (id: number, newState: boolean) => {
    try {
      const response = await fetch(`/api/dashboard/proyectos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newState }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del proyecto');
      }
  
      // Actualiza el estado local para reflejar el cambio
      const updatedProyectos = proyectos.map((proyecto) => 
        proyecto.id === id ? { ...proyecto, isActive: newState } : proyecto
      );
      setProyectos(updatedProyectos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <Button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white">
        Agregar Proyecto
      </Button>

      {/* Dialogo de ShadCN */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay />
        <DialogContent className="p-6">
          <DialogTitle className="text-lg font-bold">Nebo Proyecto</DialogTitle>
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
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white ml-2"
            >
              Cancelar
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Listado de proyectos */}
      <div className="mt-5">
        <h2 className="text-lg font-bold mb-5 text-white">Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proyectos.map((proyecto) => (
            <div
                key={proyecto.id}
                className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative"
            >
                <img
                src={proyecto.imagenUrl}
                alt={proyecto.nombre}
                className="w-full h-32 object-cover"
                />
                <div className="p-4">
                <h3 className="font-semibold text-xl mb-2">{proyecto.nombre}</h3>
                <p className={`text-sm ${proyecto.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    {proyecto.isActive ? "Activo" : "Inactivo"}
                </p>
                <button
                    onClick={() => handleToggleActive(proyecto.id, !proyecto.isActive)}
                    className={`mt-3 px-3 py-1 text-white rounded ${
                    proyecto.isActive ? 'bg-red-500' : 'bg-green-500'
                    }`}
                >
                    {proyecto.isActive ? 'Desactivar' : 'Activar'}
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>

    </div>
  );
};

export default Proyectos;
