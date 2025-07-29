'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AddDroneModal from '@/components/maintainer/AddDroneModal';

interface DroneService {
  id: number;
  title: string;
  slug: string;
  price?: number;
  isActive: boolean;
  featured: boolean;
}

interface DroneProject {
  id: number;
  title: string;
  slug: string;
  location?: string;
  completedAt?: string;
  isActive: boolean;
  featured: boolean;
}

export default function AdminDronesPage() {
  const [services, setServices] = useState<DroneService[]>([]);
  const [projects, setProjects] = useState<DroneProject[]>([]);
  const [activeTab, setActiveTab] = useState<'services' | 'projects'>('services');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<{ type: 'service' | 'project'; open: boolean }>({ type: 'service', open: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        fetch('/api/drones/services?active=all'),
        fetch('/api/drones/projects?active=all')
      ]);
      
      const servicesData = await servicesRes.json();
      const projectsData = await projectsRes.json();
      
      setServices(servicesData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleServiceActive = async (id: number, isActive: boolean) => {
    try {
      const service = services.find(s => s.id === id);
      if (!service) return;

      const response = await fetch(`/api/drones/services/${service.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;

    try {
      const service = services.find(s => s.id === id);
      if (!service) return;

      const response = await fetch(`/api/drones/services/${service.slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const toggleProjectActive = async (id: number, isActive: boolean) => {
    try {
      const project = projects.find(p => p.id === id);
      if (!project) return;

      const response = await fetch(`/api/drones/projects/${project.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

    try {
      const project = projects.find(p => p.id === id);
      if (!project) return;

      const response = await fetch(`/api/drones/projects/${project.slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Drones</h1>
        <div className="space-x-2">
          <Button 
            onClick={() => setShowModal({ type: 'service', open: true })}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Nuevo Servicio
          </Button>
          <Button 
            onClick={() => setShowModal({ type: 'project', open: true })}
            className="bg-green-600 hover:bg-green-700"
          >
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Servicios ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Proyectos ({projects.length})
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'services' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-500">/{service.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.price ? `$${service.price.toLocaleString()}` : 'Consultar'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                      {service.featured && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Destacado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => toggleServiceActive(service.id, service.isActive)}
                      className="text-green-600 hover:text-green-900"
                    >
                      {service.isActive ? 'Desactivar' : 'Activar'}
                    </button>
                    <button 
                      onClick={() => deleteService(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {services.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🚁</div>
              <p className="text-gray-500">Aún no hay servicios. ¡Crea el primero!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proyecto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500">/{project.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.location || 'No especificada'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.completedAt 
                      ? new Date(project.completedAt).toLocaleDateString('es-ES')
                      : 'En progreso'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        project.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {project.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                      {project.featured && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Destacado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => toggleProjectActive(project.id, project.isActive)}
                      className="text-green-600 hover:text-green-900"
                    >
                      {project.isActive ? 'Desactivar' : 'Activar'}
                    </button>
                    <button 
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {projects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🏗️</div>
              <p className="text-gray-500">Aún no hay proyectos. ¡Crea el primero!</p>
            </div>
          )}
        </div>
      )}

      <AddDroneModal 
        isOpen={showModal.open}
        onClose={() => setShowModal({ ...showModal, open: false })}
        onSuccess={fetchData}
        type={showModal.type}
      />
    </div>
  );
}