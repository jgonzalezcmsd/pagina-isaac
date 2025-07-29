export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog de Construcción y Arquitectura
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las últimas tendencias, técnicas y proyectos en
            construcción, arquitectura y fotogrametría con drones.
          </p>
        </div>

        <div className="text-center py-16 bg-white rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              ¡Próximamente contenido increíble!
            </h3>
            <p className="text-gray-700">
              Estamos preparando artículos fascinantes sobre construcción,
              arquitectura y las últimas tendencias del sector. ¡Vuelve
              pronto!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}