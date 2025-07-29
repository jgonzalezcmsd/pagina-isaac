import {
  About,
  ContactForm,
  Footer,
  Hero,
  Projects,
  Navbar,
} from "../components/index";
import { RecentBlog } from "../components/ui/RecentBlog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project + BIM",
  description: "Bienvenido a ProjectBIM, donde ofrecemos soluciones de construcción innovadoras.",
  keywords: "construcción, proyectos, innovación, BIM, off-site, 3D, sustainability, IOT, simulation, presupuesto, ingeniería, proyectos 3D, fotogrametria",
  authors: [{ name: "Isaac Campos" }],
  openGraph: {
    title: "Project + BIM",
    description: "Bienvenido a ProjectBIM, donde ofrecemos soluciones de construcción innovadoras.",
    url: "https://projectbim.cl",
    locale: "es_ES",
    type: "website",
    siteName: "Project + BIM",
    images: ["https://projectbim.cl/assets/logos/Logo-sin-fondo.png"]
  },
  alternates: {
    canonical: "https://projectbim.cl"
  }
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <main className="flex flex-col row-start-2 items-center sm:items-start">
            <section id="hero" className="col w-screen">
              <Hero />
            </section>
            <section id="services" className="col w-screen">
              <About />
            </section>
            <section id="projects" className="col w-screen h-full  ">
              <Projects />
            </section>
            <section id="blog" className="col w-screen">
              <RecentBlog />
            </section>
            <section id="contact" className="col w-screen ">
              <ContactForm />
            </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
