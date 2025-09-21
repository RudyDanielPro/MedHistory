import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import apiService from "../utils/apiService";


export function StudentNotifications () {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const notifs = await apiService.getStudentNotifications();
        setNotifications(notifs);
        setNotificationCount(notifs.filter(n => !n.read).length);
      } catch (err) {
        setError("No se pudieron cargar las notificaciones.");
      } finally {
        setLoading(false);
      }
    };
    // Obtener nombre del usuario del token
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const data = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        setUserName(data.name || data.username || "Estudiante");
      } catch {}
    }
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleMarkAsRead = async (id) => {
    try {
      await apiService.markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      setNotificationCount(prev => prev - 1);
    } catch {
      alert("No se pudo marcar como leída.");
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
            {loading ? (
              <div className="text-center text-lg py-10">Cargando notificaciones...</div>
            ) : error ? (
              <div className="text-center text-destructive py-10">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">No tienes notificaciones.</div>
            ) : notifications.map((notification) => (
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
                    {!notification.read && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                        Marcar como leída
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer 
      isAuthenticated={true} 
      isStudent = {true}  />
    </div>
  );
};