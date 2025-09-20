import React, { useState } from "react";
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
  userName, 
  notificationCount = 0,
  onLogout 
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

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
    React.createElement('header', { className: 'medical-nav sticky top-0 z-50 bg-white border-b shadow-sm' },
      React.createElement('div', { className: 'container mx-auto px-4 py-4' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          // Logo - ACTUALIZADO: Redirige al dashboard correspondiente
          React.createElement(Link, { 
            to: getDashboardPath(), 
            className: "flex items-center space-x-3" 
          },
            React.createElement('div', { 
              className: "w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center" 
            },
              React.createElement('i', { className: "fas fa-user-md text-white text-lg" })
            ),
            React.createElement('span', { className: "text-2xl font-heading font-bold gradient-text" }, "MedHistory")
          ),

          // Desktop Navigation
          React.createElement('nav', { className: 'hidden md:flex items-center space-x-8' },
            !isAuthenticated ? (
              React.createElement(React.Fragment, null,
                publicNavItems.map((item) =>
                  React.createElement(Link, {
                    key: item.path,
                    to: item.path,
                    className: `font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }, item.label)
                ),
                React.createElement('div', { className: 'flex items-center space-x-4' },
                  React.createElement(Button, { 
                    asChild: true 
                  },
                    React.createElement(Link, { to: "/login" }, "Iniciar sesión")
                  )
                )
              )
            ) : (
              React.createElement(React.Fragment, null,
                // Authenticated Navigation
                userType === 'student' && React.createElement(Button, { 
                  variant: "outline",
                  asChild: true 
                },
                  React.createElement(Link, { to: "/student/consultation" },
                    React.createElement('i', { className: "fas fa-file-medical mr-2" }),
                    "Realizar consulta"
                  )
                ),
                
                userType === 'admin' && React.createElement(React.Fragment, null,
                  React.createElement(Button, { 
                    variant: "outline",
                    asChild: true 
                  },
                    React.createElement(Link, { to: "/admin/register" },
                      React.createElement('i', { className: "fas fa-user-plus mr-2" }),
                      "Registrar usuario"
                    )
                  ),                 
                ),
                
                // Notifications
                userType !== 'admin' && React.createElement(Button, { 
                  variant: "outline", 
                  size: "icon", 
                  className: "relative",
                  asChild: true 
                },
                  React.createElement(Link, { to: `/${userType}/notifications` },
                    React.createElement('i', { className: "fas fa-bell" }),
                    notificationCount > 0 && React.createElement(Badge, { 
                      variant: "destructive", 
                      className: "absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs" 
                    }, notificationCount)
                  )
                ),

                // User Menu Dropdown - CORREGIDO: No anidar botones
                React.createElement('div', { className: "relative" },
                  React.createElement(DropdownMenuTrigger, { onClick: toggleDropdown },
                    React.createElement('div', { className: "cursor-pointer" },
                      React.createElement(Button, { variant: "outline" },
                        React.createElement('i', { className: "fas fa-user mr-2" }),
                        userName,
                        React.createElement('i', { className: "fas fa-chevron-down ml-2" })
                      )
                    )
                  ),
                  React.createElement(DropdownMenu, { isOpen: isDropdownOpen, onClose: closeDropdown },
                    // Mostrar perfil solo para no administradores
                    userType !== 'admin' && React.createElement(DropdownMenuItem, { asChild: true },
                      React.createElement(Link, { 
                        to: `/${userType}/profile`,
                        onClick: closeDropdown
                      },
                        React.createElement('i', { className: "fas fa-user-cog mr-2" }),
                        "Perfil"
                      )
                    ),
                    // Opción de cerrar sesión para todos los usuarios autenticados
                    React.createElement(DropdownMenuItem, { 
                      onClick: () => {
                        onLogout?.();
                        closeDropdown();
                      }
                    },
                      React.createElement('i', { className: "fas fa-sign-out-alt mr-2" }),
                      "Cerrar sesión"
                    )
                  )
                )
              )
            )
          ),

          // Mobile Menu Button
          React.createElement(Button, {
            variant: "outline",
            size: "icon",
            className: "md:hidden",
            onClick: () => setIsMenuOpen(!isMenuOpen)
          },
            React.createElement('i', { className: `fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}` })
          )
        ),

        // Mobile Navigation
        isMenuOpen && React.createElement('div', { 
          className: "md:hidden mt-4 pb-4 border-t border-gray-200 pt-4" 
        },
          !isAuthenticated ? (
            React.createElement('div', { className: "flex flex-col space-y-4" },
              publicNavItems.map((item) =>
                React.createElement(Link, {
                  key: item.path,
                  to: item.path,
                  className: `font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`,
                  onClick: () => setIsMenuOpen(false)
                }, item.label)
              ),
              React.createElement('div', { className: "flex flex-col space-y-2" },
                React.createElement(Button, { 
                  asChild: true 
                },
                  React.createElement(Link, { 
                    to: "/login", 
                    onClick: () => setIsMenuOpen(false) 
                  }, "Iniciar sesión")
                )
              )
            )
          ) : (
            React.createElement('div', { className: "flex flex-col space-y-4" },
              userType === 'student' && React.createElement(Link, {
                to: "/student/consultation",
                className: "flex items-center text-gray-700 hover:text-blue-600",
                onClick: () => setIsMenuOpen(false)
              },
                React.createElement('i', { className: "fas fa-file-medical mr-2" }),
                "Realizar consulta"
              ),
              userType === 'admin' && React.createElement(React.Fragment, null,
                React.createElement(Link, {
                  to: "/admin/register",
                  className: "flex items-center text-gray-700 hover:text-blue-600",
                  onClick: () => setIsMenuOpen(false)
                },
                  React.createElement('i', { className: "fas fa-user-plus mr-2" }),
                  "Registrar usuario"
                ),
                React.createElement(Link, {
                  to: "/admin/dashboard",
                  className: "flex items-center text-gray-700 hover:text-blue-600",
                  onClick: () => setIsMenuOpen(false)
                },
                )
              ),
              userType !== 'admin' && React.createElement(Link, {
                to: `/${userType}/notifications`,
                className: "flex items-center text-gray-700 hover:text-blue-600",
                onClick: () => setIsMenuOpen(false)
              },
                React.createElement('i', { className: "fas fa-bell mr-2" }),
                "Notificaciones",
                notificationCount > 0 && React.createElement(Badge, { 
                  variant: "destructive", 
                  className: "ml-2" 
                }, notificationCount)
              ),
              userType !== 'admin' && React.createElement(Link, {
                to: `/${userType}/profile`,
                className: "flex items-center text-gray-700 hover:text-blue-600",
                onClick: () => setIsMenuOpen(false)
              },
                React.createElement('i', { className: "fas fa-user-cog mr-2" }),
                "Perfil"
              ),
              React.createElement('button', {
                onClick: () => {
                  onLogout?.();
                  setIsMenuOpen(false);
                },
                className: "flex items-center text-gray-700 hover:text-blue-600 text-left"
              },
                React.createElement('i', { className: "fas fa-sign-out-alt mr-2" }),
                "Cerrar sesión"
              )
            )
          )
        )
      )
    )
  );
};

export { Header };