import { useState, cloneElement, Children } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

export function StudentDashboard () {
  const navigate = useNavigate();
  const [userName] = useState("Juan Pérez");
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    navigate("/");
  };

  const recentConsultations = [
    {
      id: 1,
      patientName: "María González",
      date: "2024-01-15",
      status: "Evaluada",
      grade: "4.5",
      doctor: "Dr. Carlos Mendoza"
    },
    {
      id: 2,
      patientName: "Pedro Rodríguez",
      date: "2024-01-12",
      status: "Pendiente",
      grade: null,
      doctor: "Dra. Ana López"
    },
    {
      id: 3,
      patientName: "Laura Castro",
      date: "2024-01-10",
      status: "Evaluada",
      grade: "3.8",
      doctor: "Dr. Miguel Torres"
    }
  ];

  const quickStats = [
    {
      title: "Consultas Realizadas",
      value: "12",
      icon: "fas fa-file-medical",
      color: "bg-primary"
    },
    {
      title: "Promedio General",
      value: "4.2",
      icon: "fas fa-chart-line",
      color: "bg-accent"
    },
    {
      title: "Evaluaciones Pendientes",
      value: "2",
      icon: "fas fa-clock",
      color: "bg-secondary"
    },
    {
      title: "Doctores Evaluadores",
      value: "5",
      icon: "fas fa-user-md",
      color: "bg-primary"
    }
  ];

  // Componente Button
  const Button = ({ 
    children, 
    size = 'md', 
    variant = 'default', 
    className = '', 
    asChild = false, 
    ...props 
  }) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };
    
    const variantClasses = {
      default: 'bg-primary text-white hover:bg-primary/90',
      outline: 'border border-primary text-primary bg-transparent hover:bg-primary/10',
      destructive: 'bg-destructive text-white hover:bg-destructive/90'
    };
    
    const classes = `rounded-md font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    
    if (asChild) {
      return cloneElement(Children.only(children), {
        className: `${children.props.className || ''} ${classes}`,
        ...props
      });
    }
    
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  };

  // Componente Card
  const Card = ({ children, className = '' }) => {
    return (
      <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
      </div>
    );
  };

  // Componente CardHeader
  const CardHeader = ({ children, className = '' }) => {
    return (
      <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
      </div>
    );
  };

  // Componente CardTitle
  const CardTitle = ({ children, className = '' }) => {
    return (
      <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
      </h3>
    );
  };

  // Componente CardContent
  const CardContent = ({ children, className = '' }) => {
    return (
      <div className={`p-6 pt-8 ${className}`}>
        {children}
      </div>
    );
  };

  // Componente Badge
  const Badge = ({ 
    children, 
    variant = 'default', 
    className = '' 
  }) => {
    const variantClasses = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground'
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
      isAuthenticated={true}
        userType="student"
        userName={userName}
        notificationCount={notificationCount}
        onLogout={handleLogout}
    />

      {/* Welcome Section */}
      <section className="py-12 hero-section">
        <div className="container px-4 mx-auto">
          <div className="text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl font-heading">
              <i className="mr-3 fas fa-tachometer-alt"></i>
              Dashboard Estudiante
            </h1>
            <p className="text-xl text-white/90">
              Bienvenido de vuelta, <strong>{userName}</strong>
            </p>
            <p className="mt-2 text-lg text-white/80">
              Gestiona tus consultas médicas y revisa tus evaluaciones
            </p>
          </div>
        </div>
      </section>    

      {/* Stats Cards */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h2 className="mb-6 text-2xl font-bold text-center font-heading text-foreground">
            Resumen de Actividad
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="text-center medical-card">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${stat.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Consultations */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-heading text-foreground">
              <i className="mr-3 fas fa-history text-primary"></i>
              Consultas Recientes
            </h2>            
          </div>

          <div className="grid gap-6">
            {recentConsultations.map((consultation) => (
              <Card key={consultation.id} className="medical-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        <i className="mr-2 fas fa-user text-primary"></i>
                        Paciente: {consultation.patientName}
                      </CardTitle>
                      <p className="mt-1 text-muted-foreground">
                        <i className="mr-2 fas fa-calendar"></i>
                        {new Date(consultation.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge 
                      variant={consultation.status === "Evaluada" ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      <i className={`fas ${consultation.status === "Evaluada" ? "fa-check-circle" : "fa-clock"}`}></i>
                      {consultation.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <p className="mb-1 text-sm font-semibold text-foreground">
                        Doctor Evaluador:
                      </p>
                      <p className="text-muted-foreground">
                        <i className="mr-1 fas fa-user-md"></i>
                        {consultation.doctor}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-foreground">
                        Calificación:
                      </p>
                      {consultation.grade ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-accent">
                            {consultation.grade}
                          </span>
                          <span className="text-muted-foreground">/5.0</span>
                          <div className="flex text-accent">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i} 
                                className={`fas fa-star ${i < Math.floor(parseFloat(consultation.grade)) ? '' : 'opacity-30'}`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          <i className="mr-1 fas fa-hourglass-half"></i>
                          Pendiente de evaluación
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <i className="mr-2 fas fa-eye"></i>
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center font-heading text-foreground">
            <i className="mr-3 fas fa-lightbulb text-accent"></i>
            Consejos para Mejores Evaluaciones
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="text-center transition-transform duration-300 medical-card hover:scale-105">
              <CardContent className="p-6">
                <i className="mb-4 text-3xl fas fa-clipboard-check text-primary"></i>
                <h3 className="mb-3 font-semibold font-heading text-foreground">
                  Documentación Detallada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Incluye todos los datos relevantes del paciente y síntomas observados
                </p>
              </CardContent>
            </Card>
            <Card className="text-center transition-transform duration-300 medical-card hover:scale-105">
              <CardContent className="p-6">
                <i className="mb-4 text-3xl fas fa-search text-accent"></i>
                <h3 className="mb-3 font-semibold font-heading text-foreground">
                  Análisis Profundo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Justifica tu diagnóstico con base en evidencia clínica y síntomas
                </p>
              </CardContent>
            </Card>
            <Card className="text-center transition-transform duration-300 medical-card hover:scale-105">
              <CardContent className="p-6">
                <i className="mb-4 text-3xl fas fa-pills text-secondary"></i>
                <h3 className="mb-3 font-semibold font-heading text-foreground">
                  Tratamiento Integral
                </h3>
                <p className="text-sm text-muted-foreground">
                  Propone un plan de tratamiento completo y realista
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer 
      isAuthenticated={true} 
      isStudent = {true}  />
    </div>
  );
};