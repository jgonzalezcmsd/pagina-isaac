'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CotizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicio?: string;
}

export default function CotizacionModal({ isOpen, onClose, servicio = '' }: CotizacionModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    servicio: servicio,
    descripcion: '',
    ubicacion: '',
    area: '',
    presupuesto: '',
    fechaRequerida: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setFormData({
            nombre: '',
            email: '',
            telefono: '',
            empresa: '',
            servicio: '',
            descripcion: '',
            ubicacion: '',
            area: '',
            presupuesto: '',
            fechaRequerida: ''
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending quotation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              ¡Solicitud Enviada!
            </h3>
            <p className="text-gray-600">
              Nos pondremos en contacto contigo pronto.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitar Cotización</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Empresa</label>
              <input
                type="text"
                value={formData.empresa}
                onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Servicio *</label>
              <select
                required
                value={formData.servicio}
                onChange={(e) => setFormData(prev => ({ ...prev, servicio: e.target.value }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar servicio</option>
                <option value="Fotogrametría Aérea">Fotogrametría Aérea</option>
                <option value="Levantamiento Topográfico">Levantamiento Topográfico</option>
                <option value="Modelado 3D">Modelado 3D</option>
                <option value="Inspección con Drones">Inspección con Drones</option>
                <option value="Mapeo y Cartografía">Mapeo y Cartografía</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ubicación del Proyecto</label>
              <input
                type="text"
                value={formData.ubicacion}
                onChange={(e) => setFormData(prev => ({ ...prev, ubicacion: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Área Aproximada</label>
              <input
                type="text"
                placeholder="ej: 10 hectáreas"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Presupuesto Estimado</label>
              <select
                value={formData.presupuesto}
                onChange={(e) => setFormData(prev => ({ ...prev, presupuesto: e.target.value }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar rango</option>
                <option value="Menos de $500.000">Menos de $500.000</option>
                <option value="$500.000 - $1.000.000">$500.000 - $1.000.000</option>
                <option value="$1.000.000 - $2.000.000">$1.000.000 - $2.000.000</option>
                <option value="Más de $2.000.000">Más de $2.000.000</option>
                <option value="A consultar">A consultar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha Requerida</label>
              <input
                type="date"
                value={formData.fechaRequerida}
                onChange={(e) => setFormData(prev => ({ ...prev, fechaRequerida: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción del Proyecto *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe tu proyecto, objetivos y cualquier requerimiento específico..."
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}