import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}