import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

// Utilidad para combinar clases
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Componentes Card actualizados
const Card = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className),
    ...props
  })
));

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  })
));

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('h3', {
    ref: ref,
    className: cn("text-2xl font-semibold leading-none tracking-tight", className),
    ...props
  })
));

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('p', {
    ref: ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  })
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn("p-6 pt-4", className),
    ...props
  })
));

// Componente Button
const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  onClick,
  ...props 
}) => {
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
  
  const classes = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className
  );
  
  return (
    React.createElement('button', {
      className: classes,
      onClick: onClick,
      ...props
    }, children)
  );
};

// Componente Badge
const Badge = ({ 
  variant = "default", 
  className = "", 
  children 
}) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };
  
  const classes = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    className
  );
  
  return (
    React.createElement('span', { className: classes }, children)
  );
};

// Componente Dialog
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    React.createElement('div', { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" },
      React.createElement('div', { className: "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2" },
        children
      )
    )
  );
};

const DialogTrigger = ({ asChild = false, children, ...props }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      className: cn(children.props.className, "cursor-pointer")
    });
  }
  
  return (
    React.createElement('button', {
      className: "cursor-pointer",
      ...props
    }, children)
  );
};

const DialogContent = ({ className = "", children }) => {
  return (
    React.createElement('div', {
      className: cn("grid gap-4 border bg-background p-6 shadow-lg rounded-lg", className)
    }, children)
  );
};

const DialogHeader = ({ className = "", children }) => {
  return (
    React.createElement('div', {
      className: cn("flex flex-col space-y-1.5", className)
    }, children)
  );
};

const DialogTitle = ({ className = "", children }) => {
  return (
    React.createElement('h3', {
      className: cn("text-lg font-semibold leading-none tracking-tight", className)
    }, children)
  );
};

const DialogDescription = ({ className = "", children }) => {
  return (
    React.createElement('p', {
      className: cn("text-sm text-muted-foreground", className)
    }, children)
  );
};

// Componente Input
const Input = ({ className = "", ...props }) => {
  return (
    React.createElement('input', {
      className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
      ...props
    })
  );
};

// Componente Label
const Label = ({ className = "", children, ...props }) => {
  return (
    React.createElement('label', {
      className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
      ...props
    }, children)
  );
};

// Componente Select
const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  const handleSelect = (value) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };
  
  return (
    React.createElement('div', { className: "relative" },
      React.createElement('button', {
        className: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        onClick: () => setIsOpen(!isOpen)
      },
        React.createElement('span', null, selectedValue || "Seleccionar rol"),
        React.createElement('i', { className: "fas fa-chevron-down ml-2" })
      ),
      isOpen && (
        React.createElement('div', { className: "absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md" },
          children
        )
      )
    )
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return React.createElement('div', props, children);
};

const SelectContent = ({ children }) => {
  return React.createElement('div', null, children);
};

const SelectItem = ({ value, children, ...props }) => {
  return (
    React.createElement('button', {
      className: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      onClick: () => props.onClick(value),
      ...props
    }, children)
  );
};

const SelectValue = ({ placeholder }) => {
  return React.createElement('span', null, placeholder);
};

// Función toast simulada
const toast = ({ title, description, variant = "default" }) => {
  console.log(`${variant.toUpperCase()}: ${title} - ${description}`);
  alert(`${title}: ${description}`);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState('Admin');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
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
      status: 'active',
      createdAt: '2024-01-20'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: '', password: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Usuario creado",
      description: `Se ha creado la cuenta de ${user.name} exitosamente`
    });
  };

  // Función para abrir el diálogo de confirmación de eliminación
  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Función para eliminar un usuario
  const deleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      
      toast({
        title: "Usuario eliminado",
        description: `Se ha eliminado la cuenta de ${userToDelete.name}`
      });
    }
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

        // Stats Cards - MODIFICADO: Texto centrado verticalmente
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8' },
          stats.map((stat, index) =>
            React.createElement(Card, { key: index },
              React.createElement(CardContent, { className: 'p-6' },
                React.createElement('div', { className: 'flex items-center' }, // Mantenemos flex horizontal
                  React.createElement('div', { className: `${stat.color} text-white p-3 rounded-lg mr-4 flex items-center justify-center` }, // Añadido flex y centrado
                    React.createElement('i', { className: `${stat.icon} text-xl` })
                  ),
                  React.createElement('div', { className: 'flex flex-col justify-center' }, // Añadido para centrado vertical
                    React.createElement('p', { className: 'text-sm font-medium text-gray-600' }, stat.title),
                    React.createElement('p', { className: 'text-2xl font-bold text-gray-900' }, stat.value)
                  )
                )
              )
            )
          )
        ),

        // Actions - Botón para crear nueva cuenta con diálogo
        React.createElement('div', { className: 'mb-8' },
          React.createElement(Dialog, {
            open: isDialogOpen,
            onOpenChange: setIsDialogOpen
          },
            React.createElement(DialogTrigger, { asChild: true },
              React.createElement(Button, { className: "medical-button" },
                React.createElement('i', { className: "fas fa-plus mr-2" }),
                'Crear Nueva Cuenta'
              )
            ),
            React.createElement(DialogContent, { className: "sm:max-w-md" },
              React.createElement(DialogHeader, null,
                React.createElement(DialogTitle, null, 'Crear Nueva Cuenta'),
                React.createElement(DialogDescription, null,
                  'Registra un nuevo usuario en el sistema'
                )
              ),
              React.createElement('div', { className: 'space-y-4' },
                React.createElement('div', null,
                  React.createElement(Label, { htmlFor: 'name' }, 'Nombre Completo'),
                  React.createElement(Input, {
                    id: 'name',
                    value: newUser.name,
                    onChange: (e) => setNewUser({...newUser, name: e.target.value}),
                    placeholder: 'Ej: Dr. Juan Pérez'
                  })
                ),
                React.createElement('div', null,
                  React.createElement(Label, { htmlFor: 'email' }, 'Email'),
                  React.createElement(Input, {
                    id: 'email',
                    type: 'email',
                    value: newUser.email,
                    onChange: (e) => setNewUser({...newUser, email: e.target.value}),
                    placeholder: 'email@ejemplo.com'
                  })
                ),
                React.createElement('div', null,
                  React.createElement(Label, { htmlFor: 'role' }, 'Rol'),
                  React.createElement(Select, {
                    value: newUser.role,
                    onValueChange: (value) => setNewUser({...newUser, role: value})
                  },
                    React.createElement(SelectTrigger, null,
                      React.createElement(SelectValue, { placeholder: "Seleccionar rol" })
                    ),
                    React.createElement(SelectContent, null,
                      React.createElement(SelectItem, { value: "student" }, "Estudiante"),
                      React.createElement(SelectItem, { value: "doctor" }, "Doctor")
                    )
                  )
                ),
                React.createElement('div', null,
                  React.createElement(Label, { htmlFor: 'password' }, 'Contraseña Temporal'),
                  React.createElement(Input, {
                    id: 'password',
                    type: 'password',
                    value: newUser.password,
                    onChange: (e) => setNewUser({...newUser, password: e.target.value}),
                    placeholder: 'Contraseña temporal'
                  })
                ),
                React.createElement(Button, {
                  onClick: handleCreateUser,
                  className: "w-full medical-button"
                }, 'Crear Cuenta')
              )
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
                          variant: "destructive",
                          size: "sm",
                          onClick: () => confirmDeleteUser(user)
                        },
                          React.createElement('i', { className: "fas fa-trash mr-1" }),
                          'Eliminar'
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

      // Diálogo de confirmación para eliminar usuario
      React.createElement(Dialog, {
        open: isDeleteDialogOpen,
        onOpenChange: setIsDeleteDialogOpen
      },
        React.createElement(DialogContent, { className: "sm:max-w-md" },
          React.createElement(DialogHeader, null,
            React.createElement(DialogTitle, null, 'Confirmar Eliminación'),
            React.createElement(DialogDescription, null,
              userToDelete ? `¿Estás seguro de que deseas eliminar la cuenta de ${userToDelete.name}? Esta acción no se puede deshacer.` : ''
            )
          ),
          React.createElement('div', { className: 'flex justify-end space-x-4 mt-4' },
            React.createElement(Button, {
              variant: "outline",
              onClick: () => setIsDeleteDialogOpen(false)
            }, 'Cancelar'),
            React.createElement(Button, {
              variant: "destructive",
              onClick: deleteUser
            }, 'Eliminar')
          )
        )
      ),

      React.createElement(Footer)
    )
  );
};

export default AdminDashboard;