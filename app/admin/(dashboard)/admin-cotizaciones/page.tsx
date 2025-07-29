'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Cotizacion {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  servicio: string;
  descripcion: string;
  ubicacion?: string;
  area?: string;
  presupuesto?: string;
  fechaRequerida?: string;
  estado: string;
  notas?: string;
  createdAt: string;
}

export default function AdminCotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    try {
      const response = await fetch('/api/cotizaciones');
      const data = await response.json();
      setCotizaciones(data);
    } catch (error) {
      console.error('Error fetching cotizaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (id: number, estado: string, notas?: string) => {
    try {
      const response = await fetch('/api/cotizaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado, notas })
      });

      if (response.ok) {
        fetchCotizaciones();
      }
    } catch (error) {
      console.error('Error updating cotizacion:', error);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'contactado': return 'bg-blue-100 text-blue-800';
      case 'cotizado': return 'bg-green-100 text-green-800';
      case 'cerrado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cotizaciones</h1>
        <div className="text-sm text-gray-600">
          Total: {cotizaciones.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cotizaciones.map((cotizacion) => (
              <tr key={cotizacion.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{cotizacion.nombre}</div>
                  <div className="text-sm text-gray-500">{cotizacion.email}</div>
                  {cotizacion.empresa && (
                    <div className="text-sm text-gray-500">{cotizacion.empresa}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cotizacion.servicio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cotizacion.ubicacion || 'No especificada'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(cotizacion.estado)}`}>
                    {cotizacion.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(cotizacion.createdAt).toLocaleDateString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    onClick={() => setSelectedCotizacion(cotizacion)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Ver
                  </button>
                  <select
                    value={cotizacion.estado}
                    onChange={(e) => updateEstado(cotizacion.id, e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="contactado">Contactado</option>
                    <option value="cotizado">Cotizado</option>
                    <option value="cerrado">Cerrado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {cotizaciones.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500">Aún no hay cotizaciones solicitadas.</p>
          </div>
        )}
      </div>

      {selectedCotizacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detalle de Cotización</h2>
              <button 
                onClick={() => setSelectedCotizacion(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Cliente:</strong> {selectedCotizacion.nombre}
              </div>
              <div>
                <strong>Email:</strong> {selectedCotizacion.email}
              </div>
              <div>
                <strong>Teléfono:</strong> {selectedCotizacion.telefono || 'No proporcionado'}
              </div>
              <div>
                <strong>Empresa:</strong> {selectedCotizacion.empresa || 'No especificada'}
              </div>
              <div>
                <strong>Servicio:</strong> {selectedCotizacion.servicio}
              </div>
              <div>
                <strong>Ubicación:</strong> {selectedCotizacion.ubicacion || 'No especificada'}
              </div>
              <div>
                <strong>Área:</strong> {selectedCotizacion.area || 'No especificada'}
              </div>
              <div>
                <strong>Presupuesto:</strong> {selectedCotizacion.presupuesto || 'No especificado'}
              </div>
              <div>
                <strong>Fecha Requerida:</strong> {selectedCotizacion.fechaRequerida ? new Date(selectedCotizacion.fechaRequerida).toLocaleDateString('es-ES') : 'No especificada'}
              </div>
            </div>
            
            <div className="mb-4">
              <strong>Descripción:</strong>
              <p className="mt-1 text-gray-700">{selectedCotizacion.descripcion}</p>
            </div>
            
            <div className="mb-4">
              <strong>Notas internas:</strong>
              <textarea
                rows={3}
                value={selectedCotizacion.notas || ''}
                onChange={(e) => setSelectedCotizacion({...selectedCotizacion, notas: e.target.value})}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Agregar notas..."
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => updateEstado(selectedCotizacion.id, selectedCotizacion.estado, selectedCotizacion.notas)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Guardar Notas
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}