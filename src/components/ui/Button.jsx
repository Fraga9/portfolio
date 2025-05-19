// src/components/ui/Button.jsx
function Button({ children, variant = "primary", className = "", ...props }) {
    const variants = {
      primary: "bg-maroon-flush-600 hover:bg-maroon-flush-700 text-white",
      secondary: "bg-white border border-maroon-flush-600 text-maroon-flush-600 hover:bg-maroon-flush-50",
      outline: "bg-transparent border border-white text-white hover:bg-white/10"
    };
  
    return (
      <button
        className={`px-5 py-2.5 rounded-md font-medium transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export default Button;