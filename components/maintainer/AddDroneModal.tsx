'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AddDroneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  type: 'service' | 'project';
}

export default function AddDroneModal({ isOpen, onClose, onSuccess, type }: AddDroneModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    location: '',
    area: '',
    equipment: '',
    deliverables: '',
    price: '',
    duration: '',
    clientName: '',
    completedAt: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    featuredImage: '',
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = type === 'service' ? '/api/drones/services' : '/api/drones/projects';
      const data = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        completedAt: formData.completedAt || null
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          shortDescription: '',
          location: '',
          area: '',
          equipment: '',
          deliverables: '',
          price: '',
          duration: '',
          clientName: '',
          completedAt: '',
          metaTitle: '',
          metaDescription: '',
          keywords: '',
          featuredImage: '',
          featured: false
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error creating:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formDataImg = new FormData();
      formDataImg.append('image', file);

      const response = await fetch('/api/drones/upload', {
        method: 'POST',
        body: formDataImg
      });

      const data = await response.json();
      setFormData(prev => ({ ...prev, featuredImage: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Nuevo {type === 'service' ? 'Servicio' : 'Proyecto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción Corta</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {type === 'service' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Precio</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duración</label>
                    <input
                      type="text"
                      placeholder="2-3 días"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </>
              )}

              {type === 'project' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ubicación</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Área</label>
                    <input
                      type="text"
                      placeholder="500 hectáreas"
                      value={formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cliente</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha Completado</label>
                    <input
                      type="date"
                      value={formData.completedAt}
                      onChange={(e) => setFormData(prev => ({ ...prev, completedAt: e.target.value }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Equipo</label>
                <input
                  type="text"
                  placeholder="DJI Phantom 4 RTK"
                  value={formData.equipment}
                  onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Descripción Completa *</label>
                <textarea
                  rows={8}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Entregables</label>
                <textarea
                  rows={3}
                  placeholder="Modelo 3D, Ortofoto, Curvas de nivel"
                  value={formData.deliverables}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliverables: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Meta Título</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Meta Descripción</label>
                <textarea
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Palabras Clave</label>
                <input
                  type="text"
                  placeholder="fotogrametría, drones, topografía"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imagen Principal</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded"
                />
                {formData.featuredImage && (
                  <img src={formData.featuredImage} alt="Preview" className="mt-2 h-20 object-cover rounded" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="mr-2"
              />
              Destacar
            </label>

            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Crear'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}