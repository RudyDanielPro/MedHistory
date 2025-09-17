import { useState } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export function StudentNotifications () {
  const navigate = useNavigate();
  const [userName] = useState("Juan Pérez");
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    navigate("/");
  };

  const notifications = [
    {
      id: 1,
      type: "evaluation",
      title: "Consulta evaluada por Dr. Carlos Mendoza",
      message: "Tu consulta del paciente María González ha sido evaluada. Calificación: 4.5/5.0",
      date: "2024-01-16",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "reminder",
      title: "Consulta pendiente de envío",
      message: "Tienes una consulta guardada como borrador. Complétala y envíala para evaluación.",
      date: "2024-01-15",
      read: true,
      priority: "medium"
    },
    {
      id: 3,
      type: "feedback",
      title: "Nuevo comentario del Dr. Ana López",
      message: "El doctor ha dejado comentarios adicionales en tu consulta del paciente Pedro Rodríguez.",
      date: "2024-01-14",
      read: false,
      priority: "medium"
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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={true}
        userType="student"
        userName={userName}
        notificationCount={notificationCount}
        onLogout={handleLogout}
      />

      <section className="py-20 hero-section">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            <i className="fas fa-bell mr-4"></i>
            Notificaciones
          </h1>
          <p className="text-xl text-white/90">
            Mantente al día con tus evaluaciones y actualizaciones
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`medical-card ${!notification.read ? 'border-primary' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="text-foreground">{notification.title}</span>
                    <Badge variant={notification.read ? "secondary" : "default"}>
                      {notification.read ? "Leída" : "Nueva"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{notification.message}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {new Date(notification.date).toLocaleDateString('es-ES')}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver detalles
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