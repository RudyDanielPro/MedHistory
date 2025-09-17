import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

// Implementación directa de useToast
const useToast = () => {
  const toast = useCallback((options) => {
    const { title, description, variant = "default" } = options;
    
    // Crear elemento de toast
    const toastElement = document.createElement("div");
    toastElement.className = `toast ${variant}`;
    toastElement.innerHTML = `
      <div class="toast-content">
        <h4>${title}</h4>
        <p>${description}</p>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    // Añadir al contenedor de toasts
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
    toastContainer.appendChild(toastElement);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.remove();
      }
    }, 5000);
    
    // Cerrar al hacer click
    toastElement.querySelector(".toast-close").addEventListener("click", () => {
      toastElement.remove();
    });
  }, []);
  
  const createToastContainer = () => {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
    return container;
  };
  
  return { toast };
};

// Custom Button component
const Button = ({ children, className = "", disabled = false, ...props }) => {
  return (
    <button 
      className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Input component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Custom Label component
const Label = ({ children, className = "", ...props }) => {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

// Custom Checkbox component
const Checkbox = ({ className = "", checked, onCheckedChange, ...props }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${className}`}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        {...props}
      />
    </div>
  );
};

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de correo electrónico inválido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      
      const password = formData.password;
      const email = formData.email.toLowerCase();
      const url = "http://rudy-backend-e2itqr-09d86f-31-97-130-237.traefik.me/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();


      if(response.ok) {
        const { token, message } = data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(message.email));
        
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido de nuevo, ${message.email}!`,
          variant: "default",
        });

        if (message.role === "doctor") {
          navigate("/doctor/dashboard");
        } else if(message.role === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      }

      } catch (error) {
        console.error("Authentication error:", error); // Log the error for debugging
        toast({
        title: "Error de autenticación",
        description: "Credenciales inválidas. Verifica tu correo y contraseña.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90">
            Accede a tu cuenta de MedHistory y continúa con tu experiencia médica profesional.
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <div className="p-8 medical-card">
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent">
                  <i className="text-2xl text-white fas fa-user-md"></i>
                </div>
                <h2 className="text-2xl font-bold font-heading text-foreground">
                  Bienvenido de vuelta
                </h2>
                <p className="text-muted-foreground">
                  Ingresa tus credenciales para acceder
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email">
                    <i className="mr-2 fas fa-envelope text-primary"></i>
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`medical-input ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password">
                    <i className="mr-2 fas fa-lock text-primary"></i>
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`medical-input ${errors.password ? 'border-destructive' : ''}`}
                    placeholder="Tu contraseña"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, rememberMe: checked })
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                      Recordar sesión
                    </Label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full medical-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="mr-2 fas fa-spinner fa-spin"></i>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-sign-in-alt"></i>
                      Iniciar sesión
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Demo Info */}
            <div className="p-6 mt-8 medical-card bg-accent/5 border-accent/20">
              <h3 className="mb-3 text-lg font-semibold font-heading text-foreground">
                <i className="mr-2 fas fa-info-circle text-accent"></i>
                Información de demostración
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">Para acceso como Estudiante:</p>
                  <p className="text-muted-foreground">Cualquier correo que no contenga "doctor" o "dr"</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Para acceso como Doctor:</p>
                  <p className="text-muted-foreground">Correo que contenga "doctor" o "dr" (ej: doctor@test.com)</p>
                </div>
                <p className="text-muted-foreground">
                  <i className="mr-1 fas fa-key"></i>
                  Cualquier contraseña es válida para la demostración
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;