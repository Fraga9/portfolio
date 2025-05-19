function Container({ children, className = "" }) {
    return <div className={`container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl ${className}`}>{children}</div>
  }
  
  export default Container
  