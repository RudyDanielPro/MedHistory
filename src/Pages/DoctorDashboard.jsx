import { useState, cloneElement, Children } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

export function DoctorDashboard () {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [notificationCount] = useState(5);

  const handleLogout = () => {
    navigate("/");
  };

  const pendingConsultations = [
    {
      id: 1,
      studentName: "Ana García",
      patientName: "Ricardo López",
      submittedDate: "2024-01-16",
      symptoms: "Dolor abdominal, náuseas, fiebre",
      diagnosis: "Probable apendicitis aguda",
      priority: "Alta"
    },
    {
      id: 2,
      studentName: "Miguel Santos",
      patientName: "Carmen Ruiz",
      submittedDate: "2024-01-15",
      symptoms: "Tos persistente, fatiga",
      diagnosis: "Bronquitis crónica",
      priority: "Media"
    },
    {
      id: 3,
      studentName: "Laura Jiménez",
      patientName: "José Herrera",
      submittedDate: "2024-01-14",
      symptoms: "Hipertensión, dolor de cabeza",
      diagnosis: "Crisis hipertensiva",
      priority: "Alta"
    }
  ];

  const recentEvaluations = [
    {
      id: 1,
      studentName: "Juan Pérez",
      patientName: "María González",
      evaluatedDate: "2024-01-15",
      grade: "4.5",
      feedback: "Excelente análisis clínico y plan de tratamiento apropiado"
    },
    {
      id: 2,
      studentName: "Sofia Morales",
      patientName: "Pedro Castro",
      evaluatedDate: "2024-01-14",
      grade: "3.8",
      feedback: "Buen diagnóstico, mejorar documentación de síntomas"
    }
  ];

  const quickStats = [
    {
      title: "Consultas Pendientes",
      value: "8",
      icon: "fas fa-clock",
      color: "bg-secondary"
    },
    {
      title: "Evaluadas Este Mes",
      value: "24",
      icon: "fas fa-check-circle",
      color: "bg-accent"
    },
    {
      title: "Estudiantes Asignados",
      value: "15",
      icon: "fas fa-graduation-cap",
      color: "bg-primary"
    },
    {
      title: "Promedio de Calificación",
      value: "4.1",
      icon: "fas fa-star",
      color: "bg-accent"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Alta": return "bg-destructive";
      case "Media": return "bg-secondary";
      case "Baja": return "bg-muted";
      default: return "bg-muted";
    }
  };

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
        userType="doctor"
        userName={userName}
        notificationCount={notificationCount}
        onLogout={handleLogout}
    />

      {/* Welcome Section */}
      <section className="py-12 hero-section">
        <div className="container px-4 mx-auto">
          <div className="text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl font-heading">
              <i className="mr-3 fas fa-user-md"></i>
              Dashboard Doctor
            </h1>
            <p className="text-xl text-white/90">
              Bienvenido de vuelta, <strong>{userName}</strong>
            </p>
            <p className="mt-2 text-lg text-white/80">
              Evalúa consultas médicas y guía a futuros profesionales
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="medical-button" asChild>
              <Link to="/doctor/notifications">
                <i className="mr-2 fas fa-file-medical"></i>
                Evaluar Consultas
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

      {/* Pending Consultations */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-heading text-foreground">
              <i className="mr-3 fas fa-hourglass-half text-secondary"></i>
              Consultas Pendientes de Evaluación
            </h2>
            <Button variant="outline" asChild>
              <Link to="/doctor/notifications">
                Ver todas
                <i className="ml-2 fas fa-arrow-right"></i>
              </Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {pendingConsultations.map((consultation) => (
              <Card key={consultation.id} className="medical-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        <i className="mr-2 fas fa-graduation-cap text-primary"></i>
                        Estudiante: {consultation.studentName}
                      </CardTitle>
                      <p className="mt-1 text-muted-foreground">
                        <i className="mr-2 fas fa-user"></i>
                        Paciente: {consultation.patientName}
                      </p>
                      <p className="text-muted-foreground">
                        <i className="mr-2 fas fa-calendar"></i>
                        Enviada: {new Date(consultation.submittedDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <Badge 
                      className={`${getPriorityColor(consultation.priority)} text-white`}
                    >
                      <i className="mr-1 fas fa-exclamation-triangle"></i>
                      Prioridad {consultation.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-foreground">
                        <i className="mr-1 fas fa-stethoscope"></i>
                        Síntomas Reportados:
                      </p>
                      <p className="p-3 text-sm rounded text-muted-foreground bg-muted/30">
                        {consultation.symptoms}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-foreground">
                        <i className="mr-1 fas fa-diagnoses"></i>
                        Diagnóstico del Estudiante:
                      </p>
                      <p className="p-3 text-sm rounded text-muted-foreground bg-accent/10">
                        {consultation.diagnosis}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <i className="mr-2 fas fa-eye"></i>
                      Ver completa
                    </Button>
                    <Button className="medical-button" size="sm">
                      <i className="mr-2 fas fa-clipboard-check"></i>
                      Evaluar ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Evaluations */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold font-heading text-foreground">
            <i className="mr-3 fas fa-check-circle text-accent"></i>
            Evaluaciones Recientes
          </h2>

          <div className="grid gap-6">
            {recentEvaluations.map((evaluation) => (
              <Card key={evaluation.id} className="medical-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        <i className="mr-2 fas fa-graduation-cap text-primary"></i>
                        Estudiante: {evaluation.studentName}
                      </CardTitle>
                      <p className="mt-1 text-muted-foreground">
                        <i className="mr-2 fas fa-user"></i>
                        Paciente: {evaluation.patientName}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-accent">
                          {evaluation.grade}
                        </span>
                        <span className="text-muted-foreground">/5.0</span>
                      </div>
                      <div className="flex mt-1 text-accent">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star text-sm ${i < Math.floor(parseFloat(evaluation.grade)) ? '' : 'opacity-30'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      <i className="mr-1 fas fa-comment"></i>
                      Retroalimentación:
                    </p>
                    <p className="p-3 text-sm border rounded text-muted-foreground bg-accent/5 border-accent/20">
                      {evaluation.feedback}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <i className="mr-1 fas fa-calendar"></i>
                      Evaluada: {new Date(evaluation.evaluatedDate).toLocaleDateString('es-ES')}
                    </p>
                    <Button variant="outline" size="sm">
                      <i className="mr-2 fas fa-eye"></i>
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Guidelines */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center font-heading text-foreground">
            <i className="mr-3 fas fa-clipboard-list text-primary"></i>
            Criterios de Evaluación
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="text-center medical-card">
              <CardContent className="p-6 pt-8">
                <i className="mb-4 text-3xl fas fa-search-plus text-primary"></i>
                <h3 className="mb-3 font-semibold font-heading text-foreground">
                  Análisis Clínico
                </h3>
                <p className="text-sm text-muted-foreground">
                  Evaluación de la interpretación de síntomas y análisis diferencial
                </p>
              </CardContent>
            </Card>
            <Card className="text-center medical-card">
              <CardContent className="p-6">
                <i className="mb-4 text-3xl fas fa-diagnoses text-accent"></i>
                <h3 className="mb-3 font-semibold font-heading text-foreground">
                  Precisión Diagnóstica
                </h3>
                <p className="text-sm text-muted-foreground">
                  Correctitud del diagnóstico y justificación médica apropiada
                </p>
              </CardContent>
            </Card>
            <Card className="text-center medical-card">
              <CardContent className="p-6">
                <i className="mb-4 text-3xl fas fa-prescription-bottle-alt text-secondary"></i>
                <h3 className="mb-3 font-semibold font-heading text-foreground">
                  Plan de Tratamiento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adecuación y viabilidad del plan terapéutico propuesto
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer 
      isAuthenticated={true}
      isStudent = {false} />
    </div>
  );
};