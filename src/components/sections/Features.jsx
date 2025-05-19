import Container from "../layout/Container"
import FeatureCard from "../ui/FeatureCard"

function Features({ id }) {
  const features = [
    {
      title: "Diseño Responsivo",
      description:
        "Crea diseños que se vean geniales en cualquier dispositivo, adaptándose perfectamente a todas las pantallas.",
      icon: "📱",
      color: "#d0ff00", // Color amarillo/lima de Worklouder
      position: "right",
    },
    {
      title: "Personalización Sencilla",
      description: "Modifica los estilos fácilmente con Tailwind CSS para crear una experiencia única y personalizada.",
      icon: "🎨",
      color: "#ff5500", // Color naranja
      position: "left",
    },
    {
      title: "Reutilización de Componentes",
      description: "Crea una vez, usa en todas partes. Componentes modulares para un desarrollo más eficiente.",
      icon: "♻️",
      color: "#00c8ff", // Color azul
      position: "right",
    },
  ]

  return (
    <section id={id} className="py-24 bg-black">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
            <span className="text-white text-sm font-medium">Características</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Características Principales</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Descubre por qué nuestro producto destaca del resto con estas increíbles características
          </p>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              position={feature.position}
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Features
