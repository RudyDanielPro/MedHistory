import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

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
  const Input = ({ id, value, onChange, type = "text", placeholder = "", className = "" }) => {
    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${className}`}
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

  // Componente Avatar
  const Avatar = ({ className = "", children }) => {
    return (
      <div className={`avatar ${className}`}>
        {children}
      </div>
    );
  };

  // Componente AvatarImage
  const AvatarImage = ({ src, alt, className = "" }) => {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`avatar-image ${className}`}
      />
    );
  };

  // Componente AvatarFallback
  const AvatarFallback = ({ className = "", children }) => {
    return (
      <div className={`avatar-fallback ${className}`}>
        {children}
      </div>
    );
  };
export function StudentProfile  ()  {
  const navigate = useNavigate();
  const [userName] = useState("Juan Pérez");
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    navigate("/");
  };

  const [profileData, setProfileData] = useState({
    name: "Juan Pérez",
    email: "juan.perez@estudiante.com",
    university: "Universidad de Ciencias Médicas",
    year: "4to año",
    phone: "+53 5555-1234",
    avatar: ""
  });

  

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
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
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-user-cog"></i>
            Mi Perfil
          </h1>
          <p className="text-xl text-white/90">
            Gestiona tu información personal y académica
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  <i className="mr-3 fas fa-graduation-cap text-primary"></i>
                  Información del Estudiante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    {profileData.avatar ? (
                      <AvatarImage src={profileData.avatar} alt="Foto de perfil" />
                    ) : (
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="text-center">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" type="button" className="medical-button">
                        <i className="mr-2 fas fa-camera"></i>
                        Cambiar foto
                      </Button>
                    </Label>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Formatos: JPG, PNG. Máximo 5MB
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="university">Universidad</Label>
                  <Input
                    id="university"
                    value={profileData.university}
                    onChange={handleInputChange}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Año académico</Label>
                  <Input
                    id="year"
                    value={profileData.year}
                    onChange={handleInputChange}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="medical-input"
                  />
                </div>
                <Button className="w-full medical-button">
                  <i className="mr-2 fas fa-save"></i>
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer isAuthenticated={true} />
    </div>
  );
};
