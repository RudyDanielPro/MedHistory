import { useState, cloneElement, Children } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export function DoctorProfile () {
  const navigate = useNavigate();
  const [userName] = useState("Dr. Carlos Mendoza");
  const [notificationCount] = useState(5);

  const handleLogout = () => {
    navigate("/");
  };

  const [profileData, setProfileData] = useState({
    name: "Dr. Carlos Mendoza",
    email: "carlos.mendoza@doctor.com",
    specialty: "Medicina Interna",
    license: "MD-12345",
    hospital: "Hospital Nacional",
    phone: "+53 5555-9876"
  });

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
      return cloneElement(Children.only(children), {
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

  // Componente Input
  const Input = ({ 
    id, 
    value, 
    className = '', 
    type = 'text',
    onChange,
    ...props 
  }) => {
    const classes = `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
    
    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={classes}
        {...props}
      />
    );
  };

  // Componente Label
  const Label = ({ 
    htmlFor, 
    children, 
    className = '' 
  }) => {
    const classes = `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`;
    
    return (
      <label htmlFor={htmlFor} className={classes}>
        {children}
      </label>
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
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            <i className="fas fa-user-md mr-4"></i>
            Mi Perfil
          </h1>
          <p className="text-xl text-white/90">
            Gestiona tu información profesional médica
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  <i className="fas fa-stethoscope mr-3 text-primary"></i>
                  Información Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Input
                    id="specialty"
                    value={profileData.specialty}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="license">Número de licencia</Label>
                  <Input
                    id="license"
                    value={profileData.license}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="hospital">Hospital/Institución</Label>
                  <Input
                    id="hospital"
                    value={profileData.hospital}
                    className="medical-input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    className="medical-input"
                  />
                </div>
                <Button className="medical-button w-full">
                  <i className="fas fa-save mr-2"></i>
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer 
      isAuthenticated={true}
      isStudent = {false} />
    </div>
  );
};