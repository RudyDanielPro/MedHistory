import React, { useState, useEffect, Children } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../utils/apiService";

const Button = ({
  children,
  size = "md",
  variant = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline:
      "border border-primary text-primary bg-transparent hover:bg-primary/10",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
  };

  const classes = `rounded-md font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (asChild) {
    return React.cloneElement(Children.only(children), {
      className: `${children.props.className || ""} ${classes}`,
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-8 ${className}`}>{children}</div>;
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export function DoctorConsultations() {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [notificationCount, setNotificationCount] = useState(0);
  const [allConsultations, setAllConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'evaluated'

  useEffect(() => {
    const loadAllConsultations = async () => {
      try {
        setLoading(true);
        const documentsWithNotes = await apiService.getDocumentsWithMetadata();

        setAllConsultations(documentsWithNotes);

        // Set notification count to pending consultations
        const pending = documentsWithNotes.filter((doc) => !doc.isEvaluated);
        setNotificationCount(pending.length);
      } catch (error) {
        console.error("Error loading all consultations:", error);
        setError("Error al cargar las consultas");
      } finally {
        setLoading(false);
      }
    };

    loadAllConsultations();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Alta":
        return "bg-destructive";
      case "Media":
        return "bg-secondary";
      case "Baja":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  const filteredConsultations = allConsultations.filter((consultation) => {
    if (filter === "pending") return !consultation.isEvaluated;
    if (filter === "evaluated") return consultation.isEvaluated;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        userType="doctor"
        userName={userName}
        notificationCount={notificationCount}
        onLogout={handleLogout}
      />

      {/* Header Section */}
      <section className="py-12 hero-section">
        <div className="container px-4 mx-auto">
          <div className="text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl font-heading">
              <i className="mr-3 fas fa-file-medical"></i>
              Todas las Consultas
            </h1>
            <p className="text-xl text-white/90">
              Gestiona y evalúa todas las consultas médicas
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                Todas ({allConsultations.length})
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
              >
                Pendientes (
                {allConsultations.filter((c) => !c.isEvaluated).length})
              </Button>
              <Button
                variant={filter === "evaluated" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("evaluated")}
              >
                Evaluadas (
                {allConsultations.filter((c) => c.isEvaluated).length})
              </Button>
            </div>
            <Button variant="outline" asChild>
              <Link to="/doctor/notifications">
                <i className="mr-2 fas fa-bell"></i>
                Ver notificaciones
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Consultations List */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <i className="mr-3 text-2xl fas fa-spinner fa-spin text-primary"></i>
              <span className="text-lg text-muted-foreground">
                Cargando consultas...
              </span>
            </div>
          ) : error ? (
            <div className="p-6 text-center bg-destructive/10 rounded-lg">
              <i className="mb-2 text-3xl fas fa-exclamation-triangle text-destructive"></i>
              <p className="text-destructive">{error}</p>
            </div>
          ) : filteredConsultations.length === 0 ? (
            <div className="p-8 text-center bg-background rounded-lg">
              <i className="mb-4 text-4xl fas fa-file-medical text-muted-foreground"></i>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {filter === "pending"
                  ? "No hay consultas pendientes"
                  : filter === "evaluated"
                  ? "No hay consultas evaluadas"
                  : "No hay consultas disponibles"}
              </h3>
              <p className="text-muted-foreground">
                {filter === "pending"
                  ? "Todas las consultas han sido evaluadas"
                  : filter === "evaluated"
                  ? "Aún no has evaluado ninguna consulta"
                  : "No se encontraron consultas"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredConsultations.map((consultation) => (
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
                          Enviada:{" "}
                          {new Date(
                            consultation.submittedDate
                          ).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          className={`${getPriorityColor(
                            consultation.priority
                          )} text-white`}
                        >
                          <i className="mr-1 fas fa-exclamation-triangle"></i>
                          Prioridad {consultation.priority}
                        </Badge>
                        <Badge
                          variant={
                            consultation.isEvaluated ? "default" : "secondary"
                          }
                        >
                          {consultation.isEvaluated ? "Evaluada" : "Pendiente"}
                        </Badge>
                      </div>
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

                    {consultation.isEvaluated && consultation.latestNote && (
                      <div className="mb-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          <i className="mr-2 fas fa-clipboard-check text-primary"></i>
                          Última Evaluación
                        </h4>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-accent">
                              {consultation.latestNote.grade}
                            </span>
                            <span className="text-muted-foreground">/5.0</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              consultation.latestNote.createdAt
                            ).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                        {consultation.latestNote.evaluationCriteria
                          ?.feedback && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Retroalimentación:</strong>{" "}
                            {
                              consultation.latestNote.evaluationCriteria
                                .feedback
                            }
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/doctor/revision/${consultation.id}`}>
                          <i className="mr-2 fas fa-eye"></i>
                          Ver completa
                        </Link>
                      </Button>
                      {!consultation.isEvaluated && (
                        <Button className="medical-button" size="sm" asChild>
                          <Link to={`/doctor/revision/${consultation.id}`}>
                            <i className="mr-2 fas fa-clipboard-check"></i>
                            Evaluar ahora
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer isAuthenticated={true} isStudent={false} />
    </div>
  );
}

export default DoctorConsultations;
