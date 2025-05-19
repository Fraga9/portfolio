// src/components/sections/Testimonials.jsx
import Container from '../layout/Container';

function Testimonials() {
    return (
        <section className="py-16 bg-white">
            <Container>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                    Lo que dicen nuestros clientes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Testimonios aquí */}
                </div>
            </Container>
        </section>
    );
}

export default Testimonials;