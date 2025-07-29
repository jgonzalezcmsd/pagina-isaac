import Head from "next/head";
import {
  About,
  ContactForm,
  Footer,
  Hero,
  Projects,
  Navbar,
} from "../components/index";
import { RecentBlog } from "../components/ui/RecentBlog";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Head>
          <title>Project + BIM</title>
          <meta
            name="description"
            content="Bienvenido a ProjectBIM, donde ofrecemos soluciones de construcción innovadoras."
          />
          <meta
            name="keywords"
            content="construcción, proyectos, innovación, BIM, off-site, 3D, sustainability, IOT, simulation, presupuesto, ingeniería, proyectos 3D, fotogrametria"
          />
          <meta name="author" content="Isaac Campos" />
          <meta
            property="og:description"
            content="Bienvenido a ProjectBIM, donde ofrecemos soluciones de construcción innovadoras."
          />
          <meta property="og:url" content="https://projectbim.cl" />
          <meta property="og:locale" content="es_ES" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Project + BIM" />
          <meta
            property="og:image"
            content="https://projectbim.cl/assets/logos/Logo-sin-fondo.png"
          />
          <meta property="og:title" content="Project + BIM" />
          <link rel="canonical" href="https://projectbim.cl" />
        </Head>
      <div className="font-[family-name:var(--font-geist-sans)]">
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
