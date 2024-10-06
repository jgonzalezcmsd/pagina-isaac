// components/ContactForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
// Asegúrate de que el textarea esté correctamente importado

// Define el esquema de validación usando Zod
const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Debes ingresar un correo electrónico válido"),
  message: z.string().min(1, "El mensaje no puede estar vacío"),
});

type FormData = z.infer<typeof schema>;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aquí puedes manejar el envío de datos (API, etc.)
  };

  return (
    <div className="relative bg-gray-800 ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/planta_curacavi.png")' }}
      ></div>
      <div className="relative text-white py-10 bg-black bg-opacity-50">
        <h2 className="text-3xl font-bold text-center mb-6">¡Contáctanos!</h2>
        <p className="text-lg text-center mb-4">
          Estamos aquí para ayudarte con tus proyectos. Completa el formulario y
          nos pondremos en contacto contigo.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 max-w-md mx-auto"
        >
          <div>
            <Input
              {...register("name")}
              className="border p-2 rounded text-white placeholder:text-white"
              placeholder="Nombre"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Correo Electrónico"
              className="border p-2 rounded text-white placeholder:text-white"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Textarea
              {...register("message")}
              placeholder="Mensaje"
              className='border p-2 rounded text-white placeholder:text-white'
            />
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span>
            )}
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded"
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};
