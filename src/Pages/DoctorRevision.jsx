import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import apiService from "../utils/apiService";

// Componente Button
const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  onClick,
  type = "button",
  disabled = false,
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
    <button 
      className={classes} 
      onClick={onClick} 
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente Input - CORREGIDO: Agregar readOnly para campos deshabilitados
const Input = ({ id, name, value, onChange, type = "text", placeholder = "", className = "", disabled = false, readOnly = false }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

// Componente Textarea - CORREGIDO: Agregar readOnly para campos deshabilitados
const Textarea = ({ id, name, value, onChange, placeholder = "", className = "", disabled = false, readOnly = false }) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`textarea ${className}`}
      rows={4}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

// Componente Label
const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      {children}
    </label>
  );
};

// Componente Select
const Select = ({ id, name, value, onChange, className = "", children }) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`select ${className}`}
    >
      {children}
    </select>
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

export function DoctorRevision() {
  const navigate = useNavigate();
  const { id: documentId } = useParams();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [userEmail] = useState("dr.mendoza@hospital.com");
  const [notificationCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAlreadyGraded, setIsAlreadyGraded] = useState(false);

  const [formData, setFormData] = useState({
    // Student data (pre-filled from API)
    studentName: "",
    studentEmail: "",
    doctorEmail: userEmail,
    
    // Patient data (pre-filled from API)
    patientName: "",
    patientCI: "",
    patientAge: "",
    patientSex: "",
    patientWeight: "",
    patientPhone: "",
    symptoms: "",
    conditions: "",
    allergies: "",
    
    // Student evaluation (pre-filled from API)
    medications: "",
    observations: "",
    diagnosis: "",
    treatment: "",
    
    // Doctor evaluation (nuevos campos)
    nota: "",
    criterio: "",
    correccionDiagnostico: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load document data on component mount
  useEffect(() => {
    const loadDocumentData = async () => {
      if (!documentId) {
        setError('ID de documento no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const documents = await apiService.getCurrentDoctorDocuments();
        const document = documents.find(doc => doc.id === parseInt(documentId));
        
        if (!document) {
          setError('Documento no encontrado');
          return;
        }

        const transformedData = apiService.transformDocument(document);
        
        // Load existing notes for this document
        let existingNote = null;
        try {
          const notes = await apiService.getDocumentNotes(documentId);
          if (notes && notes.length > 0) {
            // Get the most recent note
            existingNote = notes[notes.length - 1];
            setIsAlreadyGraded(true);
          }
        } catch (noteError) {
          console.log('No existing notes found or error loading notes:', noteError);
        }
        
        // Fill form with document data
        setFormData({
          studentName: transformedData.studentName,
          studentEmail: transformedData.studentEmail,
          doctorEmail: userEmail,
          patientName: transformedData.patientName,
          patientCI: transformedData.patientCI,
          patientAge: transformedData.patientAge,
          patientSex: transformedData.patientSex,
          patientWeight: transformedData.patientWeight,
          patientPhone: transformedData.patientPhone,
          symptoms: transformedData.symptoms,
          conditions: transformedData.conditions,
          allergies: transformedData.allergies,
          medications: transformedData.medications,
          observations: transformedData.observations,
          diagnosis: transformedData.diagnosis,
          treatment: transformedData.treatment,
          // Pre-fill evaluation data if already graded
          nota: existingNote ? existingNote.grade.toString() : "",
          criterio: existingNote ? existingNote.evaluationCriteria?.feedback || "" : "",
          correccionDiagnostico: existingNote ? existingNote.diagnosticCorrection?.correctedDiagnosis || "" : ""
        });
        
      } catch (err) {
        console.error('Error loading document:', err);
        setError('Error al cargar el documento');
      } finally {
        setLoading(false);
      }
    };

    loadDocumentData();
  }, [documentId, userEmail]);

  // Función toast simulada
  const toast = ({ title, description, variant = "default" }) => {
    console.log(`${variant.toUpperCase()}: ${title} - ${description}`);
    alert(`${title}: ${description}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación de los nuevos campos
    if (!formData.nota) {
      newErrors.nota = "La nota es requerida";
    }
    if (!formData.criterio.trim()) {
      newErrors.criterio = "El criterio es requerido";
    }
    if (!formData.correccionDiagnostico.trim()) {
      newErrors.correccionDiagnostico = "La corrección del diagnóstico es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit evaluation to API using the new grading system
      const gradeData = {
        grade: parseInt(formData.nota),
        evaluationCriteria: {
          feedback: formData.criterio,
          analysisQuality: "Pendiente de análisis detallado",
          clinicalAccuracy: "Pendiente de análisis detallado",
          treatmentPlan: "Pendiente de análisis detallado"
        },
        diagnosticCorrection: {
          originalDiagnosis: formData.diagnosis,
          correctedDiagnosis: formData.correccionDiagnostico,
          correctionReason: formData.criterio
        }
      };

      await apiService.gradeDocument(documentId, gradeData);
      
      toast({
        title: "Evaluación enviada exitosamente",
        description: `Tu evaluación ha sido registrada con una nota de ${formData.nota}/5.`,
      });

      // Reset form
      setFormData({
        ...formData,
        nota: "",
        criterio: "",
        correccionDiagnostico: ""
      });

      // Redirect to dashboard
      navigate("/doctor/dashboard");
      
    } catch (err) {
      console.error('Error submitting evaluation:', err);
      toast({
        title: "Error al enviar evaluación",
        description: "Hubo un problema al enviar tu evaluación. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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

      {/* Hero Section */}
      <section className="py-12 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-file-medical"></i>
            Revisión de la Consulta Médica
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90">
            Da tu criterio sobre la evaluación del estudiante, <br />corrige el diagnóstico en caso de estar mal y dale una nota al estudiante.
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-center py-8">
              <i className="mr-3 text-3xl fas fa-spinner fa-spin text-primary"></i>
              <span className="text-xl text-muted-foreground">Cargando consulta...</span>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto p-6 text-center bg-destructive/10 rounded-lg">
              <i className="mb-4 text-4xl fas fa-exclamation-triangle text-destructive"></i>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Error al cargar la consulta</h3>
              <p className="mb-4 text-destructive">{error}</p>
              <Button onClick={() => navigate("/doctor/notifications")} variant="outline">
                <i className="mr-2 fas fa-arrow-left"></i>
                Volver a notificaciones
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Consultation Form - Only show when not loading and no error */}
      {!loading && !error && (
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            {/* Already Graded Warning */}
            {isAlreadyGraded && (
              <div className="max-w-4xl mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <i className="mr-3 text-yellow-600 fas fa-exclamation-circle"></i>
                  <div>
                    <h3 className="font-semibold text-yellow-800">Consulta ya evaluada</h3>
                    <p className="text-yellow-700">
                      Esta consulta ya ha sido calificada. Puedes modificar la evaluación si es necesario.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-4xl p-6 mx-auto bg-white shadow-lg md:p-8 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-10">
              
                {/* Student Information Card */}
              <Card className="p-6 border medical-card md:p-8 bg-muted/20 rounded-xl border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-foreground">
                    <i className="mr-3 fas fa-graduation-cap text-primary"></i>
                    Información del Estudiante
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="studentName" className="block mb-2">
                        <i className="mr-2 fas fa-user text-primary"></i>
                        Nombre del estudiante
                      </Label>
                      <Input
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentEmail" className="block mb-2">
                        <i className="mr-2 fas fa-envelope text-primary"></i>
                        Correo del estudiante
                      </Label>
                      <Input
                        id="studentEmail"
                        name="studentEmail"
                        value={formData.studentEmail}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="doctorEmail" className="block mb-2">
                      <i className="mr-2 fas fa-user-md text-accent"></i>
                      Correo del doctor evaluador
                    </Label>
                    <Input
                      id="doctorEmail"
                      name="doctorEmail"
                      type="email"
                      value={formData.doctorEmail}
                      className="w-full p-3 medical-input bg-muted/30"
                      readOnly={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Patient Information Card */}
              <Card className="p-6 border medical-card md:p-8 bg-muted/20 rounded-xl border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-foreground">
                    <i className="mr-3 fas fa-user-injured text-accent"></i>
                    Datos del Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="patientName" className="block mb-2">
                        <i className="mr-2 fas fa-user text-accent"></i>
                        Nombre completo
                      </Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientCI" className="block mb-2">
                        <i className="mr-2 fas fa-id-card text-accent"></i>
                        Cédula de Identidad
                      </Label>
                      <Input
                        id="patientCI"
                        name="patientCI"
                        value={formData.patientCI}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                      <Label htmlFor="patientAge" className="block mb-2">
                        <i className="mr-2 fas fa-birthday-cake text-accent"></i>
                        Edad
                      </Label>
                      <Input
                        id="patientAge"
                        name="patientAge"
                        type="number"
                        value={formData.patientAge}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientSex" className="block mb-2">
                        <i className="mr-2 fas fa-venus-mars text-accent"></i>
                        Sexo
                      </Label>
                      <Input
                        id="patientSex"
                        name="patientSex"
                        value={formData.patientSex === "masculino" ? "Masculino" : "Femenino"}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientWeight" className="block mb-2">
                        <i className="mr-2 fas fa-weight text-accent"></i>
                        Peso (kg)
                      </Label>
                      <Input
                        id="patientWeight"
                        name="patientWeight"
                        type="number"
                        value={formData.patientWeight}
                        className="w-full p-3 medical-input bg-muted/30"
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="patientPhone" className="block mb-2">
                      <i className="mr-2 fas fa-phone text-accent"></i>
                      Teléfono de contacto
                    </Label>
                    <Input
                      id="patientPhone"
                      name="patientPhone"
                      value={formData.patientPhone}
                      className="w-full p-3 medical-input bg-muted/30"
                      readOnly={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor="symptoms" className="block mb-2">
                      <i className="mr-2 fas fa-stethoscope text-accent"></i>
                      Síntomas principales
                    </Label>
                    <Textarea
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      className="medical-input w-full p-3 min-h-[120px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor="conditions" className="block mb-2">
                      <i className="mr-2 fas fa-notes-medical text-accent"></i>
                      Padecimientos conocidos
                    </Label>
                    <Textarea
                      id="conditions"
                      name="conditions"
                      value={formData.conditions}
                      className="medical-input w-full p-3 min-h-[100px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor="allergies" className="block mb-2">
                      <i className="mr-2 fas fa-exclamation-triangle text-secondary"></i>
                      Alergias conocidas
                    </Label>
                    <Textarea
                      id="allergies"
                      name="allergies"
                      value={formData.allergies}
                      className="medical-input w-full p-3 min-h-[100px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Student Evaluation Card */}
              <Card className="p-6 border medical-card md:p-8 bg-muted/20 rounded-xl border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-foreground">
                    <i className="mr-3 fas fa-clipboard-check text-primary"></i>
                    Evaluación del Estudiante
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="medications" className="block mb-2">
                      <i className="mr-2 fas fa-pills text-primary"></i>
                      Medicamentos recomendados
                    </Label>
                    <Textarea
                      id="medications"
                      name="medications"
                      value={formData.medications}
                      className="medical-input w-full p-3 min-h-[120px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor="observations" className="block mb-2">
                      <i className="mr-2 fas fa-eye text-primary"></i>
                      Observaciones clínicas
                    </Label>
                    <Textarea
                      id="observations"
                      name="observations"
                      value={formData.observations}
                      className="medical-input w-full p-3 min-h-[120px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor="diagnosis" className="block mb-2">
                      <i className="mr-2 fas fa-diagnoses text-primary"></i>
                      Diagnóstico propuesto
                    </Label>
                    <Textarea
                      id="diagnosis"
                      name="diagnosis"
                      value={formData.diagnosis}
                      className="medical-input w-full p-3 min-h-[120px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor="treatment" className="block mb-2">
                      <i className="mr-2 fas fa-prescription-bottle-alt text-primary"></i>
                      Tratamiento propuesto
                    </Label>
                    <Textarea
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      className="medical-input w-full p-3 min-h-[120px] bg-muted/30"
                      readOnly={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Doctor Evaluation Card - NUEVA SECCIÓN */}
              <Card className="p-6 border border-blue-200 medical-card md:p-8 bg-blue-50 rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-foreground">
                    <i className="mr-3 text-blue-600 fas fa-user-md"></i>
                    Evaluación del Doctor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Campo Nota (0-5) */}
                  <div>
                    <Label htmlFor="nota" className="block mb-2">
                      <i className="mr-2 text-blue-600 fas fa-star"></i>
                      Calificación (0-5) *
                    </Label>
                    <Select
                      id="nota"
                      name="nota"
                      value={formData.nota}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 ${errors.nota ? 'border-destructive' : ''}`}
                    >
                      <option value="">Seleccionar nota</option>
                      <option value="0">0 - No Aprobado</option>
                      <option value="1">1 - Muy Deficiente</option>
                      <option value="2">2 - Deficiente</option>
                      <option value="3">3 - Aceptable</option>
                      <option value="4">4 - Bueno</option>
                      <option value="5">5 - Excelente</option>
                    </Select>
                    {errors.nota && (
                      <p className="mt-2 text-sm text-destructive">{errors.nota}</p>
                    )}
                  </div>

                  {/* Campo Criterio */}
                  <div>
                    <Label htmlFor="criterio" className="block mb-2">
                      <i className="mr-2 text-blue-600 fas fa-comment-medical"></i>
                      Criterio de Evaluación *
                    </Label>
                    <Textarea
                      id="criterio"
                      name="criterio"
                      value={formData.criterio}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 min-h-[120px] ${errors.criterio ? 'border-destructive' : ''}`}
                      placeholder="Explica tu criterio sobre la evaluación del estudiante, puntos fuertes y áreas de mejora..."
                    />
                    {errors.criterio && (
                      <p className="mt-2 text-sm text-destructive">{errors.criterio}</p>
                    )}
                  </div>

                  {/* Campo Corrección del Diagnóstico */}
                  <div>
                    <Label htmlFor="correccionDiagnostico" className="block mb-2">
                      <i className="mr-2 text-blue-600 fas fa-edit"></i>
                      Corrección del Diagnóstico *
                    </Label>
                    <Textarea
                      id="correccionDiagnostico"
                      name="correccionDiagnostico"
                      value={formData.correccionDiagnostico}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 min-h-[120px] ${errors.correccionDiagnostico ? 'border-destructive' : ''}`}
                      placeholder="Proporciona la corrección del diagnóstico si es necesario, o confirma el diagnóstico del estudiante..."
                    />
                    {errors.correccionDiagnostico && (
                      <p className="mt-2 text-sm text-destructive">{errors.correccionDiagnostico}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 space-x-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/doctor/notifications")}
                  className="px-8 py-3 text-lg"
                >
                  <i className="mr-2 fas fa-arrow-left"></i>
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="px-8 py-3 text-lg medical-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="mr-2 fas fa-spinner fa-spin"></i>
                      {isAlreadyGraded ? "Actualizando evaluación..." : "Enviando evaluación..."}
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-paper-plane"></i>
                      {isAlreadyGraded ? "Actualizar evaluación" : "Enviar evaluación"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      )}

      <Footer isAuthenticated={true} />      
    </div>
  );
}