import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";

export default function DronesPage() {
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
