
import { Footer, Navbar } from '@/components';
import localFont from 'next/font/local';

export default function DronesLayout({
  children,
}: {
  children: React.ReactNode;
}) {


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

  return (
    <>
      <Navbar />
      <main className={`${geistSans.variable} ${geistMono.variable} pt-20`}>
        {children}
      </main>
      <Footer />
    </>
  );
}