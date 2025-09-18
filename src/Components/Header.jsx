import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Componente Button
const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  asChild = false, 
  onClick,
  ...props 
}) => {
  const baseClasses = "btn";
  const variantClasses = {
    default: "btn-default",
    outline: "btn-outline",
    destructive: "btn-destructive"
  };
  const sizeClasses = {
    default: "",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "btn-icon"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
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

// Componente Badge
const Badge = ({ 
  variant = "default", 
  className = "", 
  children 
}) => {
  const baseClasses = "badge";
  const variantClasses = {
    default: "badge-default",
    destructive: "badge-destructive",
    outline: "badge-outline"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Componente DropdownMenu
const DropdownMenu = ({ children }) => {
  return (
    <div className="dropdown-menu">
      {children}
    </div>
  );
};

// Componente DropdownMenuTrigger
const DropdownMenuTrigger = ({ asChild = false, children, ...props }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      className: `${children.props.className || ''} dropdown-trigger`
    });
  }
  
  return (
    <button className="dropdown-trigger" {...props}>
      {children}
    </button>
  );
};

// Componente DropdownMenuContent
const DropdownMenuContent = ({ align = "start", className = "", children }) => {
  const alignClass = align === "end" ? "dropdown-content-end" : "dropdown-content-start";
  
  return (
    <div className={`dropdown-content ${alignClass} ${className}`}>
      {children}
    </div>
  );
};

// Componente DropdownMenuItem
const DropdownMenuItem = ({ asChild = false, children, onClick, ...props }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      className: `${children.props.className || ''} dropdown-item`,
      onClick
    });
  }
  
  return (
    <button className="dropdown-item" onClick={onClick} {...props}>
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

  const isActive = (path) => location.pathname === path;

  const publicNavItems = [
    { path: "/", label: "Inicio" },
    { path: "/about", label: "Acerca de" },
    { path: "/contact", label: "Contacto" },
  ];

  return (
    React.createElement('header', { className: 'medical-nav sticky top-0 z-50' },
      React.createElement('div', { className: 'container mx-auto px-4 py-4' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          // Logo
          React.createElement(Link, { 
            to: "/", 
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
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
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
                
                userType === 'admin' && React.createElement(Button, { 
                  variant: "outline",
                  asChild: true 
                },
                  React.createElement(Link, { to: "/admin/dashboard" },
                    React.createElement('i', { className: "fas fa-tachometer-alt mr-2" }),
                    "Panel de Control"
                  )
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

                // User Menu
                React.createElement(DropdownMenu, null,
                  React.createElement(DropdownMenuTrigger, { asChild: true },
                    React.createElement(Button, { variant: "outline" },
                      React.createElement('i', { className: "fas fa-user mr-2" }),
                      userName,
                      React.createElement('i', { className: "fas fa-chevron-down ml-2" })
                    )
                  ),
                  React.createElement(DropdownMenuContent, { 
                    align: "end", 
                    className: "bg-popover" 
                  },
                    userType !== 'admin' && React.createElement(DropdownMenuItem, { asChild: true },
                      React.createElement(Link, { to: `/${userType}/profile` },
                        React.createElement('i', { className: "fas fa-user-cog mr-2" }),
                        "Perfil"
                      )
                    ),
                    React.createElement(DropdownMenuItem, { onClick: onLogout },
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
          className: "md:hidden mt-4 pb-4 border-t border-border pt-4" 
        },
          !isAuthenticated ? (
            React.createElement('div', { className: "flex flex-col space-y-4" },
              publicNavItems.map((item) =>
                React.createElement(Link, {
                  key: item.path,
                  to: item.path,
                  className: `font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
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
                className: "flex items-center text-foreground hover:text-primary",
                onClick: () => setIsMenuOpen(false)
              },
                React.createElement('i', { className: "fas fa-file-medical mr-2" }),
                "Realizar consulta"
              ),
              userType === 'admin' && React.createElement(Link, {
                to: "/admin/dashboard",
                className: "flex items-center text-foreground hover:text-primary",
                onClick: () => setIsMenuOpen(false)
              },
                React.createElement('i', { className: "fas fa-tachometer-alt mr-2" }),
                "Panel de Control"
              ),
              userType !== 'admin' && React.createElement(Link, {
                to: `/${userType}/notifications`,
                className: "flex items-center text-foreground hover:text-primary",
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
                className: "flex items-center text-foreground hover:text-primary",
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
                className: "flex items-center text-foreground hover:text-primary text-left"
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