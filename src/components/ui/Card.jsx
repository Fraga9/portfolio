function Card({ children, className = "", variant = "default" }) {
  const variantClasses = {
    default: "bg-white rounded-xl shadow-md overflow-hidden",
    experience:
      "bg-black/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300",
  }

  const selectedVariant = variantClasses[variant] || variantClasses.default

  return <div className={`${selectedVariant} ${className}`}>{children}</div>
}

export default Card
