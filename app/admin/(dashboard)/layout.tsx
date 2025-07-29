// components/ui/dashboard/DashboardLayout.tsx
"use client";
import Sidebard from '@/components/ui/dashboard/Sidebard';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Footer } from '../../../components/ui/Footer';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { data: session, status } = useSession();
  const router = useRouter();

    // Redirige si no está autenticado
    useEffect(() => {
        if (status === "loading") return; // No redirigir mientras se está verificando la sesión
        if (!session) router.push("/login"); // Cambia "/login" a la ruta de tu página de login
    }, [session, status, router]);
        return (        
            <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-gray-900-full`}>
                <Sidebard />
                <main className="flex-1 p-6 bg-gray-700">
                    {children}
                </main>
            </div>

        );
};


export default function SessionWrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider>
        <DashboardLayout>{children}</DashboardLayout>
        <Footer />
      </SessionProvider>
    );
  }

