import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import apiService from "../utils/apiService";

const DoctorNotifications = () => {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [notificationCount, setNotificationCount] = useState(0);
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPendingDocuments = async () => {
      try {
        setLoading(true);
        const documentsWithNotes = await apiService.getDocumentsWithMetadata();
        
        // Filter only pending documents (not evaluated)
        const pending = documentsWithNotes.filter(doc => !doc.isEvaluated);
        
        setPendingDocuments(pending);
        setNotificationCount(pending.length);
      } catch (error) {
        console.error('Error loading pending documents:', error);
        setError('Error al cargar las consultas pendientes');
      } finally {
        setLoading(false);
      }
    };

    loadPendingDocuments();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <i className="mr-3 text-2xl fas fa-spinner fa-spin text-primary"></i>
                <span className="text-lg text-muted-foreground">Cargando consultas...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center bg-destructive/10 rounded-lg">
                <i className="mb-2 text-3xl fas fa-exclamation-triangle text-destructive"></i>
                <p className="text-destructive">{error}</p>
              </div>
            ) : pendingDocuments.length === 0 ? (
              <div className="p-8 text-center bg-muted/30 rounded-lg">
                <i className="mb-4 text-4xl fas fa-check-circle text-accent"></i>
                <h3 className="mb-2 text-xl font-semibold text-foreground">¡Todo evaluado!</h3>
                <p className="text-muted-foreground">No hay consultas pendientes de evaluación</p>
              </div>
            ) : (
              pendingDocuments.map((document) => (
                <Card key={document.id} className="medical-card border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="text-foreground">
                        <i className="mr-2 fas fa-graduation-cap text-primary"></i>
                        Nueva consulta de {document.studentName}
                      </span>
                      <Badge variant="default">
                        Nueva
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          <i className="mr-1 fas fa-user"></i>
                          Paciente: {document.patientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          <i className="mr-1 fas fa-stethoscope"></i>
                          Síntomas:
                        </p>
                        <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                          {document.symptoms.length > 100 
                            ? `${document.symptoms.substring(0, 100)}...` 
                            : document.symptoms}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          <i className="mr-1 fas fa-diagnoses"></i>
                          Diagnóstico propuesto:
                        </p>
                        <p className="text-sm text-muted-foreground bg-accent/10 p-2 rounded">
                          {document.diagnosis.length > 100 
                            ? `${document.diagnosis.substring(0, 100)}...` 
                            : document.diagnosis}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">
                        <i className="mr-1 fas fa-calendar"></i>
                        {new Date(document.submittedDate).toLocaleDateString('es-ES')}
                        <Badge className={`ml-2 ${
                          document.priority === 'Alta' ? 'bg-destructive' :
                          document.priority === 'Media' ? 'bg-secondary' : 'bg-muted'
                        } text-white`}>
                          <i className="mr-1 fas fa-exclamation-triangle"></i>
                          {document.priority}
                        </Badge>
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/doctor/revision/${document.id}`}>
                          <i className="mr-2 fas fa-clipboard-check"></i>
                          Evaluar consulta
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer isAuthenticated={true} />
    </div>
  );
};

export default DoctorNotifications;