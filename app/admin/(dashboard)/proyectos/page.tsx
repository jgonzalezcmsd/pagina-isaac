// pages/proyectos.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Asegúrate de tener el botón de ShadCN
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditProjectModal from "@/components/maintainer/EditProjectModal";
import AddProjectModal from "../../../../components/maintainer/AddProjectModal";
import Image from 'next/image';

interface Proyecto {
  id: number;
  nombre: string;
  imagenUrl: string;
  isActive: boolean;
}

const Proyectos = () => {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

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


  const handleEditClick = (project: Proyecto) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    fetchProyectos();
  };
  const closeEditModal = () => {
    setIsOpen(false);    
    fetchProyectos(); // Refresca la lista de proyectos
  };

  


  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-xl font-bold mb-5 text-white text-center">Proyectos</h1>
      <Button onClick={handleOpenModal  } className="bg-blue-500 text-white">
        Agregar Proyecto
      </Button>
      <AddProjectModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
        />

      {/* Listado de Proyectos */}
      <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative"
          >
            <Image
              src={proyecto.imagenUrl}
              alt={proyecto.nombre}
              width={300}
              height={300}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-xl mb-2">{proyecto.nombre}</h3>
              <p className={`text-sm ${proyecto.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {proyecto.isActive ? "Activo" : "Inactivo"}
              </p>
              <button
                onClick={() => handleEditClick(proyecto)}
                className="mt-3 px-3 py-1 bg-yellow-500 text-white rounded inline-flex items-center" // Usamos inline-flex
              >
                <Pencil1Icon className="mr-1" /> {/* Añadimos un margen derecho al icono */}
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      { selectedProject && (
        <EditProjectModal
          project={selectedProject}
          isOpen={isOpen}
          onClose={closeEditModal}
        />
      )}
    </div>
    </div>
  );
};

export default Proyectos;
