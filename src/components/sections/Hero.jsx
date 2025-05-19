// src/components/sections/Hero.jsx
import Button from '../ui/Button';
import Container from '../layout/Container';

function Hero() {
  return (
    <section className="bg-gradient-to-b from-maroon-flush-900 to-maroon-flush-800 text-white py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Diseña hermosas experiencias web
          </h1>
          <p className="text-xl mb-8 text-maroon-flush-100">
            Crea componentes personalizados para tu landing page con React y Tailwind CSS v4.0
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary">Comenzar</Button>
            <Button variant="outline">Ver demostración</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;