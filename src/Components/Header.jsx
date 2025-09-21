import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Utilidad para combinar clases
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Componente Button con los estilos proporcionados
const buttonVariants = ({ variant = "default", size = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  
  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className
  );
};

const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  asChild = false, 
  onClick,
  ...props 
}) => {
  const classes = buttonVariants({ variant, size, className });
  
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      className: `${children.props.className || ''} ${classes}`,
      onClick,
      ...props
    });
  }
  
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Componente Badge con los estilos proporcionados
const badgeVariants = ({ variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };
  
  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    className
  );
};

const Badge = ({ 
  variant = "default", 
  className = "", 
  children 
}) => {
  const classes = badgeVariants({ variant, className });
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Componente DropdownMenu mejorado
const DropdownMenu = ({ children, isOpen, onClose }) => {
  // Cerrar el menú al hacer clic fuera de él
  const menuRef = React.useRef(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

// Componente DropdownMenuTrigger - CORREGIDO: No usar button dentro de button
const DropdownMenuTrigger = ({ asChild = false, children, onClick, ...props }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      className: `${children.props.className || ''} cursor-pointer`,
      onClick
    });
  }
  
  return (
    <div className="cursor-pointer" onClick={onClick} {...props}>
      {children}
    </div>
  );
};

// Componente DropdownMenuItem
const DropdownMenuItem = ({ asChild = false, children, onClick, ...props }) => {
  const baseClasses = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900";
  
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      className: `${children.props.className || ''} ${baseClasses}`,
      onClick
    });
  }
  
  return (
    <button className={baseClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Interface para las props del Header
const Header = ({ 
  isAuthenticated = false, 
  userType, 
  userName: initialUserName, 
  notificationCount = 0,
  onLogout,
  token // Añadimos el token JWT para las peticiones
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(initialUserName || "Cargando...");
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Función para obtener el nombre del usuario autenticado
  const fetchUserName = async () => {
    if (!isAuthenticated || !token) return;
    
    setIsLoading(true);
    try {
      let endpoint = "";
      
      // Determinar el endpoint según el tipo de usuario
      if (userType === 'student') {
        endpoint = "/students"; // Ajusta según tu API
      } else if (userType === 'doctor') {
        endpoint = "/doctors"; // Ajusta según tu API
      } else if (userType === 'admin') {
        endpoint = "/admin"; // Ajusta según tu API
      }
      
      if (!endpoint) {
        setUserName("Usuario");
        return;
      }
      
      const response = await fetch(`http://rudy-backend-e2itqr-09d86f-31-97-130-237.traefik.me/${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        // Ajusta según la estructura de respuesta de tu API
        setUserName(userData.username || userData.email || "Usuario");
      } else {
        setUserName("Usuario");
      }
    } catch (error) {
      console.error("Error al obtener nombre de usuario:", error);
      setUserName("Usuario");
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar el nombre del usuario cuando se autentica
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserName();
    }
  }, [isAuthenticated, token, userType]);

  // Función para determinar la ruta del dashboard según el tipo de usuario
  const getDashboardPath = () => {
    if (!isAuthenticated) return "/";
    return userType === 'student' ? "/student/dashboard" : "/doctor/dashboard";
  };

  const publicNavItems = [
    { path: "/", label: "Inicio" },
    { path: "/about", label: "Acerca de" },
    { path: "/contact", label: "Contacto" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm medical-nav">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo - ACTUALIZADO: Redirige al dashboard correspondiente */}
          <Link to={getDashboardPath()} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent">
              <i className="text-lg text-white fas fa-user-md"></i>
            </div>
            <span className="text-2xl font-bold font-heading gradient-text">MedHistory</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            {!isAuthenticated ? (
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <Button asChild>
                    <Link to="/login">Iniciar sesión</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Authenticated Navigation */}
                {userType === 'student' && (
                  <Button variant="outline" asChild>
                    <Link to="/student/consultation">
                      <i className="mr-2 fas fa-file-medical"></i>
                      Realizar consulta
                    </Link>
                  </Button>
                )}
                
                {userType === 'admin' && (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/admin/register">
                        <i className="mr-2 fas fa-user-plus"></i>
                        Registrar usuario
                      </Link>
                    </Button>
                  </>
                )}
                
                {/* Notifications */}
                {userType !== 'admin' && (
                  <Button variant="outline" size="icon" className="relative" asChild>
                    <Link to={`/${userType}/notifications`}>
                      <i className="fas fa-bell"></i>
                      {notificationCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-2 -right-2"
                        >
                          {notificationCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                )}

                {/* User Menu Dropdown - CORREGIDO: No anidar botones */}
                <div className="relative">
                  <DropdownMenuTrigger onClick={toggleDropdown}>
                    <div className="cursor-pointer">
                      <Button variant="outline">
                        <i className="mr-2 fas fa-user"></i>
                        {isLoading ? "Cargando..." : userName}
                        <i className="ml-2 fas fa-chevron-down"></i>
                      </Button>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenu isOpen={isDropdownOpen} onClose={closeDropdown}>
                    {/* Mostrar perfil solo para no administradores */}
                    {userType !== 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/${userType}/profile`}
                          onClick={closeDropdown}
                        >
                          <i className="mr-2 fas fa-user-cog"></i>
                          Perfil
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {/* Opción de cerrar sesión para todos los usuarios autenticados */}
                    <DropdownMenuItem
                      onClick={() => {
                        onLogout?.();
                        closeDropdown();
                      }}
                    >
                      <i className="mr-2 fas fa-sign-out-alt"></i>
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenu>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="pt-4 pb-4 mt-4 border-t border-gray-200 md:hidden">
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2">
                  <Button asChild>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {userType === 'student' && (
                  <Link
                    to="/student/consultation"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="mr-2 fas fa-file-medical"></i>
                    Realizar consulta
                  </Link>
                )}
                {userType === 'admin' && (
                  <>
                    <Link
                      to="/admin/register"
                      className="flex items-center text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="mr-2 fas fa-user-plus"></i>
                      Registrar usuario
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                {userType !== 'admin' && (
                  <Link
                    to={`/${userType}/notifications`}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="mr-2 fas fa-bell"></i>
                    Notificaciones
                    {notificationCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                )}
                {userType !== 'admin' && (
                  <Link
                    to={`/${userType}/profile`}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="mr-2 fas fa-user-cog"></i>
                    Perfil
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-left text-gray-700 hover:text-blue-600"
                >
                  <i className="mr-2 fas fa-sign-out-alt"></i>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };