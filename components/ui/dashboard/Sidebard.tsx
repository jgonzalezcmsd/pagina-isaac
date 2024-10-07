import Link from 'next/link'
import React from 'react';
import { MailIcon, PhotographIcon, PresentationChartBarIcon, UserIcon } from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';


const Sidebard = () => {

    const handleLogout = async () => {
        await signOut({ redirect: true }); // Cierra sesión y redirige al login
      };
  return (
    <div className="w-1/6  bg-gray-800 text-white p-5">
    <div className="flex items-center mb-5">
        <Link href="/admin" >
            <img src="/assets/logos/Logo-sin-fondo.png" alt="Logo" className="h-10 w-10 mr-2" />
            <h1 className="text-xl font-bold">Dashboard</h1>
        </Link>
    </div>
            <nav>
                <ul>
                    <li className="mb-3">
                        <Link href="/admin/proyectos" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <PresentationChartBarIcon className="h-6 w-6 mr-2" />
                            Proyectos
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/contactos" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <UserIcon className="h-6 w-6 mr-2" />
                            Contacto
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link href="/messages" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <PhotographIcon className="h-6 w-6 mr-2" />
                            Imagenes Portada
                        </Link>
                    </li>
                </ul>
            </nav>
                  {/* Botón de Cerrar Sesión al final de la sidebar */}
            <div className="mt-auto p-2">
                <button 
                onClick={handleLogout} 
                className="flex items-center p-2 hover:bg-red-600 rounded w-full"
                >
                <span className="mr-2">Cerrar Sesión</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16l4 4m0-4l-4 4" />
                </svg>
                </button>
            </div>
        </div>
  )
}

export default Sidebard;
