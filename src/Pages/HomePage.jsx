import { useState, useEffect, forwardRef  } from "react";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { Link } from "react-router-dom";
import heroImage from "../assets/medical-hero-bg.jpg";
import studentsImage from "../assets/students-consultation.jpg";
import teamImage from "../assets/medical-team.jpg";
import techImage from "../assets/medical-tech.jpg";

// Componente MedicalCarousel implementado localmente
const MedicalCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <div className="relative h-96 md:h-[500px]">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Componente FeatureCard implementado localmente
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="medical-card p-6 text-center hover:scale-105 transition-transform duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

// Componente Button implementado localmente
const Button = forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  asChild = false, 
  children, 
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary'
  };
  
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
  
  return (
    <Comp className={classes} ref={ref} {...props}>
      {children}
    </Comp>
  );
});

export function HomePage () {
  const carouselItems = [
    {
      id: 1,
      image: studentsImage,
      title: "Consultas Médicas Remotas",
      description: "Estudiantes realizan evaluaciones médicas supervisadas por doctores especialistas"
    },
    {
      id: 2,
      image: teamImage,
      title: "Evaluación Profesional",
      description: "Doctores especializados evalúan y califican las consultas de los estudiantes"
    },
    {
      id: 3,
      image: techImage,
      title: "Tecnología Médica Avanzada",
      description: "Plataforma moderna diseñada específicamente para la educación médica"
    }
  ];

  const features = [
    {
      icon: "fas fa-user-md",
      title: "Evaluación Especializada",
      description: "Doctores especializados evalúan las consultas médicas realizadas por estudiantes"
    },
    {
      icon: "fas fa-file-medical",
      title: "Consultas Detalladas",
      description: "Formularios completos para registrar datos del paciente y evaluación estudiantil"
    },
    {
      icon: "fas fa-bell",
      title: "Sistema de Notificaciones",
      description: "Notificaciones en tiempo real para mantener informados a estudiantes y doctores"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Seguridad Médica",
      description: "Plataforma segura que cumple con estándares de privacidad médica"
    },
    {
      icon: "fas fa-chart-line",
      title: "Seguimiento Académico",
      description: "Calificaciones y comentarios detallados para el progreso académico"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Acceso Móvil",
      description: "Plataforma completamente responsive para acceso desde cualquier dispositivo"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative hero-section min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Evaluación Médica
              <span className="block text-accent">Profesional</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Plataforma especializada para facilitar la evaluación remota de estudiantes 
              de medicina por parte de doctores especializados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="medical-button text-lg px-8 py-4" asChild>
                <Link to="/register">
                  <i className="fas fa-user-plus mr-2"></i>
                  Comenzar Ahora
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
                asChild
              >
                <Link to="/about">
                  <i className="fas fa-info-circle mr-2"></i>
                  Conocer Más
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              ¿Por qué elegir <span className="gradient-text">MedHistory</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una plataforma completa diseñada para revolucionar la educación médica 
              a través de la evaluación remota profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Experiencia <span className="gradient-text">Médica Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo estudiantes y doctores utilizan nuestra plataforma para 
              una educación médica más efectiva.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <MedicalCarousel items={carouselItems} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            ¿Listo para transformar la educación médica?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Únete a la comunidad de profesionales médicos que ya están utilizando 
            MedHistory para mejorar la formación de futuros doctores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
              asChild
            >
              <Link to="/register">
                <i className="fas fa-rocket mr-2"></i>
                Registrarse Gratis
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              asChild
            >
              <Link to="/contact">
                <i className="fas fa-envelope mr-2"></i>
                Contactar Equipo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
