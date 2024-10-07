"use client";
import { SessionProvider, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'; // Asegúrate de importar useRouter
import Swal from 'sweetalert2'


const Login = () => {
  const router = useRouter(); // Inicializa useRouter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
// Prevenir la recarga de la página
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
    
      if (result?.error) {
        throw new Error(result.error);
      }
    
      if (result?.ok) {
        // Si el login es exitoso, redirige al dashboard
        router.push('/admin');
      } else {
        // throw new Error('Login fallido. Intenta nuevamente.');
        Swal.fire({
          title: 'Error!',
          text: 'Login fallido',
          icon: 'error',
          confirmButtonText: 'Intentar Nuevamente'
        })
      }
    } catch (error) {
      // Maneja cualquier error lanzado
      console.error('Error al iniciar sesión:', error);
    }
  };


  return (
    <SessionProvider>
          <div className="flex items-center justify-center min-h-screen bg-gray-800">
    <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-96">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
            <img
                src="/assets/logos/Logo-sin-fondo.png" // Asegúrate de que el nombre y la ruta del logo son correctos
                alt="Logo"
                width={120} // Cambia el tamaño según sea necesario
                height={40}
                className="rounded-md"
            />
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} >
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-400">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-400">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                
            >
                Iniciar Sesión
            </button>
        </form>
        <div className="mt-4 text-center">
            <a href="#" className="text-blue-400 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
    </div>
</div>
    </SessionProvider>

  )
}


export default Login;