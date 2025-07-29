'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";

interface DroneService {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  featuredImage?: string;
  price?: number;
  duration?: string;
}

interface DroneProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  location?: string;
  featuredImage?: string;
  completedAt?: string;
  clientName?: string;
}

export default function DronesPage() {
  const [services, setServices] = useState<DroneService[]>([]);
  const [projects, setProjects] = useState<DroneProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        fetch('/api/drones/services?active=true&limit=6'),
        fetch('/api/drones/projects?active=true&limit=6')
      ]);
      
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData);
      }
      
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error('Error fetching drone data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Fotogrametría con Drones
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Servicios profesionales de levantamiento topográfico, modelado 3D
              y documentación arquitectónica utilizando tecnología de drones de
              última generación.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestros Servicios
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ofrecemos soluciones completas de fotogrametría aérea para
                diversos sectores
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {service.shortDescription}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        {service.price && (
                          <span className="text-lg font-bold text-blue-600">
                            ${service.price.toLocaleString()}
                          </span>
                        )}
                        {service.duration && (
                          <span className="text-sm text-gray-500">
                            {service.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🚁</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    ¡Servicios en desarrollo!
                  </h3>
                  <p className="text-gray-700">
                    Estamos perfeccionando nuestros servicios de fotogrametría con
                    drones para ofrecerte la mejor calidad. ¡Contáctanos para más
                    información!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Proyectos Destacados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Algunos de nuestros trabajos más representativos en
                fotogrametría con drones
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : projects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        {project.location && (
                          <span>📍 {project.location}</span>
                        )}
                        {project.completedAt && (
                          <span>
                            {new Date(project.completedAt).toLocaleDateString('es-ES')}
                          </span>
                        )}
                      </div>
                      {project.clientName && (
                        <div className="mt-2 text-sm text-gray-600">
                          Cliente: {project.clientName}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    ¡Proyectos espectaculares en camino!
                  </h3>
                  <p className="text-gray-700">
                    Estamos documentando nuestros mejores trabajos de
                    fotogrametría aérea. Pronto podrás ver casos de éxito
                    increíbles.
                  </p>
                </div>
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
              Contáctanos para obtener una cotización personalizada para tu
              proyecto
            </p>
            <a
              href="/#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Solicitar Cotización
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
