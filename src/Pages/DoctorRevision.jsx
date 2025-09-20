import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

export function DoctorRevision() {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [userEmail] = useState("dr.mendoza@hospital.com");
  const [notificationCount] = useState(3);

  const [formData, setFormData] = useState({
    // Student data (pre-filled)
    studentName: "Juan Pérez",
    studentEmail: "juan.perez@estudiante.com",
    doctorEmail: userEmail,
    
    // Patient data
    patientName: "María García",
    patientCI: "12345678901",
    patientAge: "32",
    patientSex: "femenino",
    patientWeight: "68",
    patientPhone: "+53 5555-1234",
    symptoms: "Dolor abdominal intenso, náuseas, fiebre de 38.5°C",
    conditions: "Hipertensión arterial",
    allergies: "Penicilina",
    
    // Student evaluation
    medications: "Paracetamol 500mg cada 8 horas",
    observations: "Paciente presenta dolor a la palpación en fossa ilíaca derecha",
    diagnosis: "Apendicitis aguda",
    treatment: "Intervención quirúrgica urgente, antibioticoterapia",
    
    // Doctor evaluation (nuevos campos)
    nota: "",
    criterio: "",
    correccionDiagnostico: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      
    } catch (error) {
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

      {/* Consultation Form */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
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
                  {/* Campo Nota (2-5) */}
                  <div>
                    <Label htmlFor="nota" className="block mb-2">
                      <i className="mr-2 text-blue-600 fas fa-star"></i>
                      Calificación (2-5) *
                    </Label>
                    <Select
                      id="nota"
                      name="nota"
                      value={formData.nota}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 ${errors.nota ? 'border-destructive' : ''}`}
                    >
                      <option value="">Seleccionar nota</option>
                      <option value="2">2 - Insuficiente</option>
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
                      Enviando evaluación...
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-paper-plane"></i>
                      Enviar evaluación
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer isAuthenticated={true} />      
    </div>
  );
}