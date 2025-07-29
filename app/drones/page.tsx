'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CotizacionModal from '@/components/ui/CotizacionModal';

interface DroneService {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  featuredImage?: string;
  price?: number;
  duration?: string;
  featured: boolean;
}

interface DroneProject {
  id: number;
  title: string;
  slug: string;
  location?: string;
  area?: string;
  featuredImage?: string;
  completedAt?: string;
  featured: boolean;
}

export default function DronesPage() {
  const [services, setServices] = useState<DroneService[]>([]);
  const [projects, setProjects] = useState<DroneProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCotizacion, setShowCotizacion] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        fetch('/api/drones/services?limit=6'),
        fetch('/api/drones/projects?limit=6')
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Fotogrametría con Drones
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Servicios profesionales de levantamiento topográfico, modelado 3D y 
            documentación arquitectónica utilizando tecnología de drones de última generación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#servicios"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Servicios
            </Link>
            <Link
              href="#proyectos"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Proyectos Realizados
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones completas de fotogrametría aérea para diversos sectores
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🚁</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">¡Servicios en desarrollo!</h3>
                <p className="text-gray-700">Estamos perfeccionando nuestros servicios de fotogrametría con drones para ofrecerte la mejor calidad. ¡Contáctanos para más información!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {service.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={service.featuredImage}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    {service.shortDescription && (
                      <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {service.duration && <span>{service.duration}</span>}
                        {service.price && (
                          <span className="block font-semibold text-blue-600">
                            Desde ${service.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/drones/servicios/${service.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver más →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proyectos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Algunos de nuestros trabajos más representativos en fotogrametría con drones
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🏗️</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">¡Proyectos espectaculares en camino!</h3>
                <p className="text-gray-700">Estamos documentando nuestros mejores trabajos de fotogrametría aérea. Pronto podrás ver casos de éxito increíbles.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {project.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={project.featuredImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-4">
                      {project.location && (
                        <p className="mb-1">📍 {project.location}</p>
                      )}
                      {project.area && (
                        <p className="mb-1">📐 {project.area}</p>
                      )}
                      {project.completedAt && (
                        <p>📅 {new Date(project.completedAt).toLocaleDateString('es-ES')}</p>
                      )}
                    </div>
                    <Link
                      href={`/drones/proyectos/${project.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver proyecto →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas servicios de fotogrametría con drones?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contáctanos para obtener una cotización personalizada para tu proyecto
          </p>
          <button
            onClick={() => setShowCotizacion(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Solicitar Cotización
          </button>
        </div>
      </section>
      </div>
      
      <CotizacionModal 
        isOpen={showCotizacion}
        onClose={() => setShowCotizacion(false)}
      />
    </>
  );
}