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
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard Estudiante
            </h1>
            <p className="text-xl text-white/90">
              Bienvenido de vuelta, <strong>{userName}</strong>
            </p>
            <p className="text-lg text-white/80 mt-2">
              Gestiona tus consultas médicas y revisa tus evaluaciones
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="medical-button" asChild>
              <Link to="/student/consultation">
                <i className="fas fa-plus mr-2"></i>
                Nueva Consulta
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/student/notifications">
                <i className="fas fa-bell mr-2"></i>
                Ver Notificaciones
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {notificationCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Resumen de Actividad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="medical-card text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${stat.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              <i className="fas fa-history mr-3 text-primary"></i>
              Consultas Recientes
            </h2>
            <Button variant="outline" asChild>
              <Link to="/student/consultations">
                Ver todas
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {recentConsultations.map((consultation) => (
              <Card key={consultation.id} className="medical-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        <i className="fas fa-user mr-2 text-primary"></i>
                        Paciente: {consultation.patientName}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">
                        <i className="fas fa-calendar mr-2"></i>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Doctor Evaluador:
                      </p>
                      <p className="text-muted-foreground">
                        <i className="fas fa-user-md mr-1"></i>
                        {consultation.doctor}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
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
                          <i className="fas fa-hourglass-half mr-1"></i>
                          Pendiente de evaluación
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <i className="fas fa-eye mr-2"></i>
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
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
            <i className="fas fa-lightbulb mr-3 text-accent"></i>
            Consejos para Mejores Evaluaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="medical-card text-center">
              <CardContent className="p-6">
                <i className="fas fa-clipboard-check text-primary text-3xl mb-4"></i>
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Documentación Detallada
                </h3>
                <p className="text-muted-foreground text-sm">
                  Incluye todos los datos relevantes del paciente y síntomas observados
                </p>
              </CardContent>
            </Card>
            <Card className="medical-card text-center">
              <CardContent className="p-6">
                <i className="fas fa-search text-accent text-3xl mb-4"></i>
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Análisis Profundo
                </h3>
                <p className="text-muted-foreground text-sm">
                  Justifica tu diagnóstico con base en evidencia clínica y síntomas
                </p>
              </CardContent>
            </Card>
            <Card className="medical-card text-center">
              <CardContent className="p-6">
                <i className="fas fa-pills text-secondary text-3xl mb-4"></i>
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Tratamiento Integral
                </h3>
                <p className="text-muted-foreground text-sm">
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