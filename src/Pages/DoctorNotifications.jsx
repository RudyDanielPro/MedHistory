import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

const DoctorNotifications = () => {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [notificationCount] = useState(5);

  const handleLogout = () => {
    navigate("/");
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
      return React.cloneElement(React.Children.only(children), {
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
      <div className={`p-6 pt-0 ${className}`}>
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
                      variant="outline" 
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