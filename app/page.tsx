import Image from "next/image";
import { Hero } from '../components/index';

export default function Home() {
  return (
  
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section id="hero" className="col md:w-full ">
          <Hero />
        </section>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
