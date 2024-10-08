import { About, ContactForm, Footer, Hero, Projects } from '../components/index';

export default function Home() {

  
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  row-start-2 items-center sm:items-start">
        <section id="hero" className="col md:w-full ">
          <Hero />
        </section>
        <section id="services" className='col w-full md:w-full' >
          <About />
        </section>
        <section id="projects" className="col md:w-full  " >
            <Projects />
        </section>
        <section id="contact" className="col md:w-full" >
          <ContactForm />
          
        </section>
        
      </main>
      <Footer />
    </div>
  );
}
