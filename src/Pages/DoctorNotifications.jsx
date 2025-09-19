import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const DoctorNotifications = () => {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [notificationCount] = useState(5);

  const handleLogout = () => {
    navigate("/");
  };

  // Componente Button
  const Button = ({ 
    variant = "default", 
    size = "default", 
    className = "", 
    children, 
    onClick,
    ...props 
  }) => {
    const baseClasses = "btn";
    const variantClasses = {
      default: "btn-default",
      outline: "btn-outline",
      destructive: "btn-destructive",
      secondary: "btn-secondary"
    };
    const sizeClasses = {
      default: "",
      sm: "btn-sm",
      lg: "btn-lg",
      icon: "btn-icon"
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    return (
      <button className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    );
  };

  // Componente Card
  const Card = ({ className = "", children }) => {
    return (
      <div className={`card ${className}`}>
        {children}
      </div>
    );
  };

  // Componente CardHeader
  const CardHeader = ({ className = "", children }) => {
    return (
      <div className={`card-header ${className}`}>
        {children}
      </div>
    );
  };

  // Componente CardTitle
  const CardTitle = ({ className = "", children }) => {
    return (
      <h3 className={`card-title ${className}`}>
        {children}
      </h3>
    );
  };

  // Componente CardContent
  const CardContent = ({ className = "", children }) => {
    return (
      <div className={`card-content ${className}`}>
        {children}
      </div>
    );
  };

  // Componente Badge
  const Badge = ({ 
    variant = "default", 
    children 
  }) => {
    const baseClasses = "badge";
    const variantClasses = {
      default: "badge-default",
      destructive: "badge-destructive",
      secondary: "badge-secondary",
      outline: "badge-outline"
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]}`;
    
    return (
      <span className={classes}>
        {children}
      </span>
    );
  };

  const notifications = [
    {
      id: 1,
      type: "consultation",
      title: "Nueva consulta de Ana García",
      message: "Consulta de alta prioridad sobre probable apendicitis aguda requiere evaluación urgente.",
      date: "2024-01-16",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "consultation",
      title: "Consulta de Miguel Santos",
      message: "Nueva consulta sobre bronquitis crónica enviada para evaluación.",
      date: "2024-01-15",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "reminder",
      title: "Recordatorio de evaluaciones pendientes",
      message: "Tienes 3 consultas pendientes de evaluación desde hace más de 24 horas.",
      date: "2024-01-15",
      read: true,
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={true}
        userType="doctor"
        userName={userName}
        notificationCount={notificationCount}
        onLogout={handleLogout}
      />

      <section className="py-20 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-bell"></i>
            Notificaciones
          </h1>
          <p className="text-xl text-white/90">
            Consultas pendientes y actualizaciones importantes
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`medical-card ${!notification.read ? 'border-primary' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-foreground">{notification.title}</span>
                    <Badge variant={notification.read ? "secondary" : "default"}>
                      {notification.read ? "Leída" : "Nueva"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {new Date(notification.date).toLocaleDateString('es-ES')}
                    </span>
                    <Button 
                      className="medical-button" 
                      size="sm"
                      onClick={() => navigate(`/doctor/evaluation/${notification.id}`)}
                    >
                      <i className="mr-2 fas fa-clipboard-check"></i>
                      Evaluar consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer isAuthenticated={true} />
    </div>
  );
};

export default DoctorNotifications;