import React, { useState, useEffect, Children } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../utils/apiService";

export function StudentConsultations() {
  const navigate = useNavigate();
  const [userName] = useState("Juan Pérez");
  const [notificationCount, setNotificationCount] = useState(0);
  const [allConsultations, setAllConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'evaluated'

  const handleViewDetails = async (documentId) => {
    setIsModalLoading(true);
    setIsModalOpen(true);
    setSelectedConsultation(null);
    try {
      // Obtener documento (intentar buscarlo en las consultas cargadas primero)
      let doc = allConsultations.find((d) => d.id === documentId);
      if (!doc) {
        // Si no está en las recientes, solicitar desde la API todos los documentos y buscar
        const allDocs = await apiService.getStudentDocumentsWithNotes();
        doc = allDocs.find((d) => d.id === documentId);
      }

      // Si aún no lo encontramos, intentar obtener notas y documento por separado
      if (!doc) {
        const notes = await apiService.getDocumentNotes(documentId);
        // Intentar construir un objeto mínimo
        doc = {
          id: documentId,
          notes: notes || [],
        };
      }

      setSelectedConsultation(doc);
    } catch (err) {
      console.error("Error fetching document details:", err);
      setSelectedConsultation(null);
    } finally {
      setIsModalLoading(false);
    }
  };

  // Load data from API on component mount
  useEffect(() => {
    const loadAllConsultations = async () => {
      try {
        setLoading(true);

        // Load student documents with notes
        const documents = await apiService.getStudentDocumentsWithNotes();

        // Set all consultations
        setAllConsultations(documents);

        // Set notification count to pending consultations
        const pending = documents.filter((doc) => !doc.isEvaluated);
        setNotificationCount(pending.length);
      } catch (error) {
        console.error("Error loading student consultations:", error);
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

  // Componente Button
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

  // Componente Card
  const Card = ({ children, className = "" }) => {
    return (
      <div
        className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      >
        {children}
      </div>
    );
  };

  // Componente CardHeader
  const CardHeader = ({ children, className = "" }) => {
    return (
      <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
      </div>
    );
  };

  // Componente CardTitle
  const CardTitle = ({ children, className = "" }) => {
    return (
      <h3
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      >
        {children}
      </h3>
    );
  };

  // Componente CardContent
  const CardContent = ({ children, className = "" }) => {
    return <div className={`p-6 pt-8 ${className}`}>{children}</div>;
  };

  // Componente Badge
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

  const filteredConsultations = allConsultations.filter((consultation) => {
    if (filter === "pending") return !consultation.isEvaluated;
    if (filter === "evaluated") return consultation.isEvaluated;
    return true;
  });

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
              <i className="mr-3 fas fa-history"></i>
              Todas mis Consultas
            </h1>
            <p className="text-xl text-white/90">
              Revisa el historial completo de tus consultas médicas
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
            <Button asChild>
              <Link to="/student/consultation">
                <i className="mr-2 fas fa-plus"></i>
                Nueva consulta
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
                  : "No has realizado consultas aún"}
              </h3>
              <p className="mb-4 text-muted-foreground">
                {filter === "pending"
                  ? "Todas tus consultas han sido evaluadas"
                  : filter === "evaluated"
                  ? "Aún no tienes consultas evaluadas"
                  : "Comienza creando tu primera consulta médica"}
              </p>
              {filter === "all" && (
                <Button asChild>
                  <Link to="/student/consultation">
                    <i className="mr-2 fas fa-plus"></i>
                    Crear primera consulta
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredConsultations.map((consultation) => (
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
                          {new Date(
                            consultation.submittedDate
                          ).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          consultation.isEvaluated ? "default" : "secondary"
                        }
                        className="flex items-center gap-1"
                      >
                        <i
                          className={`fas ${
                            consultation.isEvaluated
                              ? "fa-check-circle"
                              : "fa-clock"
                          }`}
                        ></i>
                        {consultation.isEvaluated ? "Evaluada" : "Pendiente"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Show patient symptoms and diagnosis */}
                    <div className="mb-4 p-4 bg-muted/20 rounded-lg">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            <i className="mr-1 fas fa-stethoscope"></i>
                            Síntomas:
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.symptoms.length > 80
                              ? `${consultation.symptoms.substring(0, 80)}...`
                              : consultation.symptoms}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            <i className="mr-1 fas fa-diagnoses"></i>
                            Mi Diagnóstico:
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.diagnosis.length > 80
                              ? `${consultation.diagnosis.substring(0, 80)}...`
                              : consultation.diagnosis}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Show evaluations if available */}
                    {consultation.isEvaluated &&
                    consultation.notes.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          <i className="mr-2 fas fa-clipboard-check text-primary"></i>
                          Evaluaciones de Doctores ({consultation.notes.length})
                        </h4>
                        {consultation.notes.map((note, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-lg bg-accent/5 border-accent/20"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-accent">
                                  {note.grade}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  /5.0
                                </span>
                                <div className="flex text-accent">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`fas fa-star text-xs ${
                                        i < Math.floor(note.grade)
                                          ? ""
                                          : "opacity-30"
                                      }`}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(note.createdAt).toLocaleDateString(
                                  "es-ES"
                                )}
                              </span>
                            </div>

                            {note.evaluationCriteria?.feedback && (
                              <div className="mb-2">
                                <p className="text-xs font-semibold text-foreground mb-1">
                                  Retroalimentación:
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {note.evaluationCriteria.feedback}
                                </p>
                              </div>
                            )}

                            {note.diagnosticCorrection?.correctedDiagnosis && (
                              <div>
                                <p className="text-xs font-semibold text-foreground mb-1">
                                  Corrección de Diagnóstico:
                                </p>
                                <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                  {note.diagnosticCorrection.correctedDiagnosis}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        {consultation.notes.length > 1 && (
                          <div className="text-center p-2 bg-accent/10 rounded-lg">
                            <p className="text-sm font-semibold text-accent">
                              <i className="mr-1 fas fa-calculator"></i>
                              Promedio: {consultation.averageGrade}/5.0
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-secondary/10 rounded-lg">
                        <p className="text-muted-foreground">
                          <i className="mr-1 fas fa-hourglass-half"></i>
                          Pendiente de evaluación por doctor
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(consultation.id)}
                      >
                        <i className="mr-2 fas fa-eye"></i>
                        Ver detalles completos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal: Detalles de la consulta */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Detalles de la Consulta</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedConsultation(null);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {isModalLoading ? (
              <div className="text-center py-8">
                <i className="fas fa-spinner fa-spin text-primary text-2xl"></i>
                <p className="mt-2">Cargando detalles...</p>
              </div>
            ) : selectedConsultation ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Paciente</p>
                  <h4 className="text-lg font-semibold">
                    {selectedConsultation.patientName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enviado:{" "}
                    {new Date(
                      selectedConsultation.submittedDate
                    ).toLocaleString("es-ES")}
                  </p>
                </div>

                <div className="p-4 bg-muted/20 rounded">
                  <h5 className="font-semibold">Síntomas</h5>
                  <p className="text-sm text-muted-foreground">
                    {selectedConsultation.symptoms}
                  </p>
                </div>

                <div className="p-4 bg-muted/20 rounded">
                  <h5 className="font-semibold">Diagnóstico del estudiante</h5>
                  <p className="text-sm text-muted-foreground">
                    {selectedConsultation.diagnosis}
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold">
                    Evaluaciones ({selectedConsultation.notes?.length || 0})
                  </h5>
                  {!selectedConsultation.notes ||
                  selectedConsultation.notes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Aún no evaluada por ningún doctor.
                    </p>
                  ) : (
                    <div className="space-y-3 mt-2">
                      {selectedConsultation.notes.map((note, idx) => (
                        <div
                          key={idx}
                          className="p-3 border rounded-lg bg-accent/5 border-accent/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-accent">
                                {note.grade}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                /5.0
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(note.createdAt).toLocaleString("es-ES")}
                            </span>
                          </div>
                          {note.evaluationCriteria?.feedback && (
                            <div className="mb-2">
                              <p className="text-xs font-semibold text-foreground mb-1">
                                Retroalimentación:
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {note.evaluationCriteria.feedback}
                              </p>
                            </div>
                          )}
                          {note.diagnosticCorrection?.correctedDiagnosis && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">
                                Corrección de Diagnóstico:
                              </p>
                              <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                {note.diagnosticCorrection.correctedDiagnosis}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                No se encontraron detalles para esta consulta.
              </div>
            )}
          </div>
        </div>
      )}

      <Footer isAuthenticated={true} isStudent={true} />
    </div>
  );
}

export default StudentConsultations;
