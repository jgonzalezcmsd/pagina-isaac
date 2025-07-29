import Link from 'next/link'
import React from 'react';
import { PhotographIcon, PresentationChartBarIcon, UserIcon } from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import Image from 'next/image';


const Sidebard = () => {

    const handleLogout = async () => {
        await signOut({ redirect: true }); // Cierra sesión y redirige al login
      };
  return (
    <div className="w-10/6  bg-gray-800 text-white p-5">
    <div className="flex items-center mb-5">
        <Link href="/admin" >
            <Image src="/assets/logos/Logo-sin-fondo.png" alt="Logo"  width={40} height={40} className="h-10 w-10 mr-2" />
            <h1 className="text-xl font-bold">Dashboard</h1>
        </Link>
    </div>
            <nav>
                <ul>
                    <li className="mb-3">
                        <Link href="/admin/admin-proyectos" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <PresentationChartBarIcon className="h-6 w-6 mr-2" />
                            Proyectos
                        </Link>
                        <hr />
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/admin-contactos" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <UserIcon className="h-6 w-6 mr-2" />
                            Contacto
                        </Link>
                        <hr />
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/admin-hero" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <PhotographIcon className="h-6 w-6 mr-2" />
                            Imagenes Portada
                        </Link>
                        <hr />
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/admin-blog" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Blog
                        </Link>
                        <hr />
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/admin-drones" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Drones
                        </Link>
                        <hr />
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/admin-cotizaciones" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Cotizaciones
                        </Link>
                        <hr />
                    </li>
                </ul>
            </nav>
                  {/* Botón de Cerrar Sesión al final de la sidebar */}
            <div className="mt-auto p-2">
                <button 
                onClick={handleLogout} 
                className="flex items-center p-2 bg-red-700 hover:bg-red-600 rounded w-full"
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
