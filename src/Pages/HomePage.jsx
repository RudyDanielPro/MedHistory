import { useState, useEffect, forwardRef  } from "react";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { Link } from "react-router-dom";
import heroImage from "../assets/medical-hero-bg.jpg";
import studentsImage from "../assets/students-consultation.jpg";
import teamImage from "../assets/medical-team.jpg";
import techImage from "../assets/medical-tech.jpg";


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
    <div className="relative overflow-hidden shadow-xl rounded-xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-full">
            <div className="relative h-96 md:h-[500px]">
              <img 
                src={item.image} 
                alt={item.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                <div className="p-8 text-white">
                  <h3 className="mb-2 text-2xl font-bold md:text-3xl">{item.title}</h3>
                  <p className="text-lg opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute p-3 text-white transition-all transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute p-3 text-white transition-all transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      <div className="absolute left-0 right-0 flex justify-center gap-2 bottom-4">
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
    <div className="p-6 text-center transition-transform duration-300 medical-card hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent">
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};


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
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>
        
        <div className="container relative px-4 py-20 mx-auto">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl font-heading">
              Evaluación Médica
              <span className="block text-accent">Profesional</span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed md:text-2xl text-white/90">
              Plataforma especializada para facilitar la evaluación remota de estudiantes 
              de medicina por parte de doctores especializados.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg text-white bg-white/10 border-white/30 hover:bg-white/20"
                asChild
              >
                <Link to="/about">
                  <i className="mr-2 fas fa-info-circle"></i>
                  Conocer Más
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl font-heading text-foreground">
              ¿Por qué elegir <span className="gradient-text">MedHistory</span>?
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
              Una plataforma completa diseñada para revolucionar la educación médica 
              a través de la evaluación remota profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl font-heading text-foreground">
              Experiencia <span className="gradient-text">Médica Digital</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
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
      <section className="py-20 text-white bg-gradient-to-r from-primary to-accent">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading">
            ¿Listo para transformar la educación médica?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl opacity-90">
            Únete a la comunidad de profesionales médicos que ya están utilizando 
            MedHistory para mejorar la formación de futuros doctores.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg text-white border-white/30 hover:bg-white/10"
              asChild
            >
              <Link to="/contact">
                <i className="mr-2 fas fa-envelope"></i>
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
