import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

// Componente Card
const Card = ({ className = '', children }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

// Componente CardHeader
const CardHeader = ({ className = '', children }) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  );
};

// Componente CardTitle
const CardTitle = ({ className = '', children }) => {
  return (
    <h3 className={`card-title ${className}`}>
      {children}
    </h3>
  );
};

// Componente CardDescription
const CardDescription = ({ className = '', children }) => {
  return (
    <p className={`card-description ${className}`}>
      {children}
    </p>
  );
};

// Componente CardContent
const CardContent = ({ className = '', children }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};

// Componente Button
const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  onClick,
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
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Componente Badge
const Badge = ({ 
  variant = "default", 
  children 
}) => {
  const baseClasses = "badge";
  const variantClasses = {
    default: "badge-default",
    destructive: "badge-destructive",
    secondary: "badge-secondary",
    outline: "badge-outline"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Función toast simulada
const toast = ({ title, description, variant = "default" }) => {
  console.log(`${variant.toUpperCase()}: ${title} - ${description}`);
  alert(`${title}: ${description}`);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState('Admin');
  
  // Mock data - esto se conectaría con tu backend
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'María García',
      email: 'maria.garcia@estudiante.edu',
      role: 'student',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Dr. Carlos López',
      email: 'carlos.lopez@hospital.com',
      role: 'doctor',
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      email: 'ana.martinez@estudiante.edu',
      role: 'student',
      status: 'inactive',
      createdAt: '2024-01-20'
    }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const stats = [
    {
      title: 'Total Usuarios',
      value: users.length,
      icon: 'fas fa-users',
      color: 'bg-blue-500'
    },
    {
      title: 'Estudiantes',
      value: users.filter(u => u.role === 'student').length,
      icon: 'fas fa-user-graduate',
      color: 'bg-green-500'
    },
    {
      title: 'Doctores',
      value: users.filter(u => u.role === 'doctor').length,
      icon: 'fas fa-user-md',
      color: 'bg-purple-500'
    },
    {
      title: 'Usuarios Activos',
      value: users.filter(u => u.status === 'active').length,
      icon: 'fas fa-check-circle',
      color: 'bg-emerald-500'
    }
  ];

  return (
    React.createElement('div', { className: 'min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50' },
      React.createElement(Header, {
        isAuthenticated: true,
        userType: "admin",
        userName: userName,
        notificationCount: 0,
        onLogout: handleLogout
      }),
      
      React.createElement('main', { className: 'flex-1 container mx-auto px-4 py-8' },
        // Welcome Section
        React.createElement('div', { className: 'mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' },
            'Panel de Administrador'
          ),
          React.createElement('p', { className: 'text-gray-600' },
            'Gestiona usuarios y configuración del sistema'
          )
        ),

        // Stats Cards
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8' },
          stats.map((stat, index) =>
            React.createElement(Card, { key: index },
              React.createElement(CardContent, { className: 'p-6' },
                React.createElement('div', { className: 'flex items-center' },
                  React.createElement('div', { className: `${stat.color} text-white p-3 rounded-lg mr-4` },
                    React.createElement('i', { className: `${stat.icon} text-xl` })
                  ),
                  React.createElement('div', null,
                    React.createElement('p', { className: 'text-sm font-medium text-gray-600' }, stat.title),
                    React.createElement('p', { className: 'text-2xl font-bold text-gray-900' }, stat.value)
                  )
                )
              )
            )
          )
        ),

        // Actions - Botón como enlace a /admin/register
        React.createElement('div', { className: 'mb-8' },
          React.createElement(Link, { 
            to: "/admin/register",
            className: "inline-block" 
          },
            React.createElement(Button, { className: 'medical-button' },
              React.createElement('i', { className: 'fas fa-plus mr-2' }),
              'Crear Nueva Cuenta'
            )
          )
        ),

        // Users Table
        React.createElement(Card, null,
          React.createElement(CardHeader, null,
            React.createElement(CardTitle, null, 'Usuarios Registrados'),
            React.createElement(CardDescription, null,
              'Lista de todos los usuarios en el sistema'
            )
          ),
          React.createElement(CardContent, null,
            React.createElement('div', { className: 'overflow-x-auto' },
              React.createElement('table', { className: 'w-full' },
                React.createElement('thead', null,
                  React.createElement('tr', { className: 'border-b' },
                    React.createElement('th', { className: 'text-left py-2' }, 'Nombre'),
                    React.createElement('th', { className: 'text-left py-2' }, 'Email'),
                    React.createElement('th', { className: 'text-left py-2' }, 'Rol'),
                    React.createElement('th', { className: 'text-left py-2' }, 'Estado'),
                    React.createElement('th', { className: 'text-left py-2' }, 'Fecha Registro'),
                    React.createElement('th', { className: 'text-left py-2' }, 'Acciones')
                  )
                ),
                React.createElement('tbody', null,
                  users.map((user) =>
                    React.createElement('tr', { key: user.id, className: 'border-b' },
                      React.createElement('td', { className: 'py-3' }, user.name),
                      React.createElement('td', { className: 'py-3' }, user.email),
                      React.createElement('td', { className: 'py-3' },
                        React.createElement(Badge, { 
                          variant: user.role === 'doctor' ? 'default' : 'secondary' 
                        },
                          user.role === 'doctor' ? 'Doctor' : 'Estudiante'
                        )
                      ),
                      React.createElement('td', { className: 'py-3' },
                        React.createElement(Badge, { 
                          variant: user.status === 'active' ? 'default' : 'destructive' 
                        },
                          user.status === 'active' ? 'Activo' : 'Inactivo'
                        )
                      ),
                      React.createElement('td', { className: 'py-3' },
                        new Date(user.createdAt).toLocaleDateString('es-ES')
                      ),
                      React.createElement('td', { className: 'py-3' },
                        React.createElement(Button, {
                          variant: "outline",
                          size: "sm",
                          onClick: () => toggleUserStatus(user.id)
                        },
                          user.status === 'active' ? 'Desactivar' : 'Activar'
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      ),

      React.createElement(Footer)
    )
  );
};

export default AdminDashboard;