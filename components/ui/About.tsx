import { GlobeAltIcon, CurrencyDollarIcon, DeviceTabletIcon, PencilIcon } from '@heroicons/react/16/solid'
import { Pencil1Icon } from '@radix-ui/react-icons'
import React from 'react'

export const About = () => {
  return (
    <section className="bg-gray-800 text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Mejora tus proyectos en OBRA</h2>
        <h3 className="text-xl mb-12">Nuestros Servicios BIM</h3>

        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Coordinación */}
          <div className="flex flex-col items-center">
            <GlobeAltIcon className="h-16 w-16 text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Coordinación</h4>
            <p className="max-w-md">
              Entendemos los problemas y proponemos soluciones, apoyando las distintas especialidades.
            </p>
          </div>

          {/* Diseño */}
          <div className="flex flex-col items-center">
            <PencilIcon className="h-16 w-16 text-blue-600 mb-4" />
            

            <h4 className="text-xl font-semibold mb-2">Diseño</h4>
            <p className="max-w-md">
              Contamos con un equipo de diseñadores que transforman tus ideas en proyectos efectivos.
            </p>
          </div>

          {/* Presupuesto */}
          <div className="flex flex-col items-center">
            <CurrencyDollarIcon className="h-16 w-16 text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Presupuesto</h4>
            <p className="max-w-md">
              Extraemos y analizamos toda la información necesaria para generar un presupuesto preciso.
            </p>
          </div>

          {/* Drones */}
          <div className="flex flex-col items-center">
            <DeviceTabletIcon className="h-16 w-16 text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Drones</h4>
            <p className="max-w-md">
              Utilizamos drones para realizar un levantamiento de información más efectivo y preciso.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
