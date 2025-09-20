import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

const StudentConsultation = () => {
  const navigate = useNavigate();
  const [userName] = useState("Juan Pérez");
  const [userEmail] = useState("juan.perez@estudiante.com");
  const [notificationCount] = useState(3);

  const [formData, setFormData] = useState({
    // Student data (pre-filled)
    studentName: userName,
    studentEmail: userEmail,
    doctorEmail: "",
    
    // Patient data
    patientName: "",
    patientCI: "",
    patientAge: "",
    patientSex: "",
    patientWeight: "",
    patientPhone: "",
    symptoms: "",
    conditions: "",
    allergies: "",
    
    // Student evaluation
    medications: "",
    observations: "",
    diagnosis: "",
    treatment: ""
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

  // Componente Input
  const Input = ({ id, name, value, onChange, type = "text", placeholder = "", className = "", disabled = false }) => {
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
      />
    );
  };

  // Componente Textarea
  const Textarea = ({ id, name, value, onChange, placeholder = "", className = "" }) => {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`textarea ${className}`}
        rows={4}
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

  // Componente Select (simplificado para el campo de sexo)
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

    // Doctor email validation
    if (!formData.doctorEmail.trim()) {
      newErrors.doctorEmail = "El correo del doctor es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.doctorEmail)) {
      newErrors.doctorEmail = "Formato de correo inválido";
    }

    // Patient data validation
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Nombre del paciente requerido";
    }
    if (!formData.patientCI.trim()) {
      newErrors.patientCI = "CI del paciente requerido";
    }
    if (!formData.patientAge.trim()) {
      newErrors.patientAge = "Edad del paciente requerida";
    }
    if (!formData.patientSex) {
      newErrors.patientSex = "Sexo del paciente requerido";
    }
    if (!formData.patientWeight.trim()) {
      newErrors.patientWeight = "Peso del paciente requerido";
    }
    if (!formData.symptoms.trim()) {
      newErrors.symptoms = "Síntomas son requeridos";
    }

    // Student evaluation validation
    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = "Diagnóstico es requerido";
    }
    if (!formData.treatment.trim()) {
      newErrors.treatment = "Tratamiento propuesto es requerido";
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
        title: "Consulta enviada exitosamente",
        description: `Tu consulta ha sido enviada a ${formData.doctorEmail} para evaluación.`,
      });

      // Reset form
      setFormData({
        studentName: userName,
        studentEmail: userEmail,
        doctorEmail: "",
        patientName: "",
        patientCI: "",
        patientAge: "",
        patientSex: "",
        patientWeight: "",
        patientPhone: "",
        symptoms: "",
        conditions: "",
        allergies: "",
        medications: "",
        observations: "",
        diagnosis: "",
        treatment: ""
      });

      // Redirect to dashboard
      navigate("/student/dashboard");
      
    } catch (error) {
      toast({
        title: "Error al enviar consulta",
        description: "Hubo un problema al enviar tu consulta. Inténtalo de nuevo.",
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
        userType="student"
        userName={userName}
        notificationCount={notificationCount}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="py-12 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-file-medical"></i>
            Nueva Consulta Médica
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90">
            Completa los datos del paciente y tu evaluación para enviar a un doctor especialista
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
                        disabled
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
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="doctorEmail" className="block mb-2">
                      <i className="mr-2 fas fa-user-md text-accent"></i>
                      Correo del doctor evaluador *
                    </Label>
                    <Input
                      id="doctorEmail"
                      name="doctorEmail"
                      type="email"
                      value={formData.doctorEmail}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 ${errors.doctorEmail ? 'border-destructive' : ''}`}
                      placeholder="doctor@ejemplo.com"
                    />
                    {errors.doctorEmail && (
                      <p className="mt-2 text-sm text-destructive">{errors.doctorEmail}</p>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">
                      <i className="mr-1 fas fa-info-circle"></i>
                      Ingresa el correo del doctor que evaluará tu consulta
                    </p>
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
                        Nombre completo *
                      </Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className={`medical-input w-full p-3 ${errors.patientName ? 'border-destructive' : ''}`}
                        placeholder="Nombre completo del paciente"
                      />
                      {errors.patientName && (
                        <p className="mt-2 text-sm text-destructive">{errors.patientName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="patientCI" className="block mb-2">
                        <i className="mr-2 fas fa-id-card text-accent"></i>
                        Cédula de Identidad *
                      </Label>
                      <Input
                        id="patientCI"
                        name="patientCI"
                        value={formData.patientCI}
                        onChange={handleInputChange}
                        className={`medical-input w-full p-3 ${errors.patientCI ? 'border-destructive' : ''}`}
                        placeholder="12345678901"
                      />
                      {errors.patientCI && (
                        <p className="mt-2 text-sm text-destructive">{errors.patientCI}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                      <Label htmlFor="patientAge" className="block mb-2">
                        <i className="mr-2 fas fa-birthday-cake text-accent"></i>
                        Edad *
                      </Label>
                      <Input
                        id="patientAge"
                        name="patientAge"
                        type="number"
                        value={formData.patientAge}
                        onChange={handleInputChange}
                        className={`medical-input w-full p-3 ${errors.patientAge ? 'border-destructive' : ''}`}
                        placeholder="Edad en años"
                      />
                      {errors.patientAge && (
                        <p className="mt-2 text-sm text-destructive">{errors.patientAge}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="patientSex" className="block mb-2">
                        <i className="mr-2 fas fa-venus-mars text-accent"></i>
                        Sexo *
                      </Label>
                      <Select
                        id="patientSex"
                        name="patientSex"
                        value={formData.patientSex}
                        onChange={handleInputChange}
                        className={`medical-input w-full p-3 ${errors.patientSex ? 'border-destructive' : ''}`}
                      >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>                        
                      </Select>
                      {errors.patientSex && (
                        <p className="mt-2 text-sm text-destructive">{errors.patientSex}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="patientWeight" className="block mb-2">
                        <i className="mr-2 fas fa-weight text-accent"></i>
                        Peso (kg) *
                      </Label>
                      <Input
                        id="patientWeight"
                        name="patientWeight"
                        type="number"
                        value={formData.patientWeight}
                        onChange={handleInputChange}
                        className={`medical-input w-full p-3 ${errors.patientWeight ? 'border-destructive' : ''}`}
                        placeholder="Peso en kg"
                      />
                      {errors.patientWeight && (
                        <p className="mt-2 text-sm text-destructive">{errors.patientWeight}</p>
                      )}
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
                      onChange={handleInputChange}
                      className="w-full p-3 medical-input"
                      placeholder="+53 5555-5555"
                    />
                  </div>

                  <div>
                    <Label htmlFor="symptoms" className="block mb-2">
                      <i className="mr-2 fas fa-stethoscope text-accent"></i>
                      Síntomas principales *
                    </Label>
                    <Textarea
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 min-h-[120px] ${errors.symptoms ? 'border-destructive' : ''}`}
                      placeholder="Describe los síntomas observados en el paciente..."
                    />
                    {errors.symptoms && (
                      <p className="mt-2 text-sm text-destructive">{errors.symptoms}</p>
                    )}
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
                      onChange={handleInputChange}
                      className="medical-input w-full p-3 min-h-[100px]"
                      placeholder="Enfermedades crónicas, condiciones preexistentes..."
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
                      onChange={handleInputChange}
                      className="medical-input w-full p-3 min-h-[100px]"
                      placeholder="Alergias a medicamentos, alimentos, etc..."
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
                      name="medifications"
                      value={formData.medications}
                      onChange={handleInputChange}
                      className="medical-input w-full p-3 min-h-[120px]"
                      placeholder="Lista de medicamentos recomendados con dosis..."
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
                      onChange={handleInputChange}
                      className="medical-input w-full p-3 min-h-[120px]"
                      placeholder="Observaciones durante el examen, signos vitales, etc..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="diagnosis" className="block mb-2">
                      <i className="mr-2 fas fa-diagnoses text-primary"></i>
                      Diagnóstico propuesto *
                    </Label>
                    <Textarea
                      id="diagnosis"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 min-h-[120px] ${errors.diagnosis ? 'border-destructive' : ''}`}
                      placeholder="Tu diagnóstico basado en los síntomas y observaciones..."
                    />
                    {errors.diagnosis && (
                      <p className="mt-2 text-sm text-destructive">{errors.diagnosis}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="treatment" className="block mb-2">
                      <i className="mr-2 fas fa-prescription-bottle-alt text-primary"></i>
                      Tratamiento propuesto *
                    </Label>
                    <Textarea
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className={`medical-input w-full p-3 min-h-[120px] ${errors.treatment ? 'border-destructive' : ''}`}
                      placeholder="Plan de tratamiento completo que propones..."
                    />
                    {errors.treatment && (
                      <p className="mt-2 text-sm text-destructive">{errors.treatment}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 space-x-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/student/dashboard")}
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
                      Enviando consulta...
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-paper-plane"></i>
                      Enviar consulta
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
};

export default StudentConsultation;