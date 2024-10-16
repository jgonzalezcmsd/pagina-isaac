"use client";
import React, { useEffect, useState } from 'react';
import 'animate.css';
import Swal from 'sweetalert2';


interface Contacto {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: { nombre: string };
  interacciones: Interaccion[];
}

interface Interaccion {
  id: number;
  tipo: string; // 'llamada', 'email', 'reunión', etc.
  fecha: Date;
  mensajes: Mensaje[];
}

interface Mensaje {
  id: number;
  texto: string;
  fecha: Date;
}
 const Page = () => {

  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    // Fetch contactos con sus interacciones desde la API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/contactos/contactos");
        const data: Contacto[] = await response.json();
        setContactos(data);
      } catch (error) {
        console.error("Error fetching contactos:", error);
      }
    };

    fetchData();
  }, []);
    const copyToClipboard = (email: string) => {
        navigator.clipboard.writeText(email)
            .then(() => {
                console.log('Correo copiado al portapapeles');
                Swal.fire({
                    icon: 'success',
                    title: 'Correo copiado',
                    text: 'El correo ha sido copiado al portapapeles',
                })
                // Puedes mostrar un mensaje de confirmación aquí si deseas
            })
            .catch(err => {
                console.error('Error al copiar el correo: ', err);
            });
    };


  return (
    <div className=" min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white text-center animate__animated animate__fadeIn">Contactos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn animate__delay-1s">
        {contactos.map((contacto) => (
          <div
            key={contacto.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow  "
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                {contacto.nombre.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {contacto.nombre}
                </h3>
                <p 
                    className="text-gray-600 text-sm cursor-pointer"
                    onClick={() => copyToClipboard(contacto.email)}
                >
                    {contacto.email}
                </p>
                {contacto.telefono && (
                  <p className="text-gray-500 text-sm">
                    <b>Teléfono:</b> {contacto.telefono}
                  </p>
                )}
                {contacto.empresa && (
                  <p className="text-gray-500 text-sm">
                    <b>Empresa:</b> {contacto.empresa.nombre}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                Mensajes
              </h4>
              <div className="space-y-3">
                {/* @ts-ignore */}
                {contacto.Interaccion?.map((interaccion) => (
                  <div
                    key={interaccion.id}
                    className="p-4 bg-gray-50 border rounded-md"
                  >
                    {/* <p className="font-semibold text-gray-800">
                      {interaccion.tipo}
                    </p> */}
                    <p className="text-gray-500 text-xs">
                      {new Date(interaccion.fecha).toLocaleString()}
                    </p>
                    <div className="mt-2">
                      {interaccion.mensajes.map((mensaje: { id: React.Key | null | undefined; texto: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                        <div
                          key={mensaje.id}
                          className="bg-white p-2 rounded-md mb-1 border"
                        >
                          <p className="text-gray-700">{mensaje.texto}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page;
