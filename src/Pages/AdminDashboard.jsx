import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import ApiService from "../utils/apiService";

// Utilidad para combinar clases
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Componentes Card actualizados
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-4", className)} {...props} />
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
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
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
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Componente Badge
const Badge = ({ variant = "default", className = "", children }) => {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variantClasses = {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    className
  );

  return <span className={classes}>{children}</span>;
};

// Componente Dialog
const Dialog = ({ open, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ asChild = false, children, ...props }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      className: cn(children.props.className, "cursor-pointer"),
    });
  }

  return (
    <button className="cursor-pointer" {...props}>
      {children}
    </button>
  );
};

const DialogContent = ({ className = "", children }) => {
  return (
    <div
      className={cn(
        "grid gap-4 border bg-background p-6 shadow-lg rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

const DialogHeader = ({ className = "", children }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>{children}</div>
  );
};

const DialogTitle = ({ className = "", children }) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

const DialogDescription = ({ className = "", children }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

// Componente Input
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

// Componente Label
const Label = ({ className = "", children, ...props }) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </label>
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
    <div className="relative">
      <button
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || "Seleccionar rol"}</span>
        <i className="fas fa-chevron-down ml-2" />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onClick: handleSelect })
          )}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const SelectContent = ({ children }) => {
  return <div>{children}</div>;
};

const SelectItem = ({ value, children, ...props }) => {
  return (
    <button
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
      onClick={() => props.onClick(value)}
      {...props}
    >
      {children}
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

// Función toast simulada
const toast = ({ title, description, variant = "default" }) => {
  console.log(`${variant.toUpperCase()}: ${title} - ${description}`);
  alert(`${title}: ${description}`);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState("Admin");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await ApiService.getAllUsers();
        const mappedUsers = fetchedUsers.map((user) => ({
          ...user,
          name: user.username, // map username to name for display
          status: "active",
          createdAt: new Date().toISOString().split("T")[0], // placeholder, since not in schema
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios",
          variant: "destructive",
        });
      }
    };
    fetchUsers();
  }, []);

  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const handleLogout = () => {
    navigate("/");
  };

  const handleCreateUser = async () => {
    if (
      !newUser.username ||
      !newUser.email ||
      !newUser.role ||
      !newUser.password
    ) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

    try {
      await ApiService.createUser({
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        passwordHash: newUser.password, // assuming the API expects passwordHash
      });
      setNewUser({ username: "", email: "", role: "", password: "" });
      setIsDialogOpen(false);

      toast({
        title: "Usuario creado",
        description: `Se ha creado la cuenta de ${newUser.username} exitosamente`,
      });

      // Refetch users
      const fetchedUsers = await ApiService.getAllUsers();
      const mappedUsers = fetchedUsers.map((user) => ({
        ...user,
        name: user.username,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el usuario",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
    setDeleteErrorMessage("");
  };

  // Función para eliminar un usuario
  const deleteUser = async () => {
    if (userToDelete) {
      try {
        await ApiService.deleteUser(userToDelete.id);
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);

        toast({
          title: "Usuario eliminado",
          description: `Se ha eliminado la cuenta de ${userToDelete.name}`,
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        setDeleteErrorMessage(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const stats = [
    {
      title: "Total Usuarios",
      value: users.length,
      icon: "fas fa-users",
      color: "bg-blue-500",
    },
    {
      title: "Estudiantes",
      value: users.filter((u) => u.role === "student").length,
      icon: "fas fa-user-graduate",
      color: "bg-green-500",
    },
    {
      title: "Doctores",
      value: users.filter((u) => u.role === "doctor").length,
      icon: "fas fa-user-md",
      color: "bg-purple-500",
    },
    {
      title: "Usuarios Activos",
      value: users.filter((u) => u.status === "active").length,
      icon: "fas fa-check-circle",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header
        isAuthenticated={true}
        userType="admin"
        userName={userName}
        notificationCount={0}
        onLogout={handleLogout}
        token={localStorage.getItem("token")}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administrador
          </h1>
          <p className="text-gray-600">
            Gestiona usuarios y configuración del sistema
          </p>
        </div>

        {/* Stats Cards - MODIFICADO: Texto centrado verticalmente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  {" "}
                  {/* Mantenemos flex horizontal */}
                  <div
                    className={`${stat.color} text-white p-3 rounded-lg mr-4 flex items-center justify-center`}
                  >
                    {" "}
                    {/* Añadido flex y centrado */}
                    <i className={`${stat.icon} text-xl`} />
                  </div>
                  <div className="flex flex-col justify-center">
                    {" "}
                    {/* Añadido para centrado vertical */}
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions - Botón para crear nueva cuenta con diálogo */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="medical-button">
                <i className="fas fa-plus mr-2" />
                Crear Nueva Cuenta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nueva Cuenta</DialogTitle>
                <DialogDescription>
                  Registra un nuevo usuario en el sistema
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    placeholder="Ej: dr_juan_perez"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="email@ejemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rol</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Estudiante</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password">Contraseña Temporal</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="Contraseña temporal"
                  />
                </div>
                <Button
                  onClick={handleCreateUser}
                  className="w-full medical-button"
                >
                  Crear Cuenta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Registrados</CardTitle>
            <CardDescription>
              Lista de todos los usuarios en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Nombre</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Rol</th>
                    <th className="text-left py-2">Estado</th>
                    <th className="text-left py-2">Fecha Registro</th>
                    <th className="text-left py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3">{user.name}</td>
                      <td className="py-3">{user.email}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            user.role === "doctor" ? "default" : "secondary"
                          }
                        >
                          {user.role === "doctor" ? "Doctor" : "Estudiante"}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={
                            user.status === "active" ? "default" : "destructive"
                          }
                        >
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="py-3">
                        {new Date(user.createdAt).toLocaleDateString("es-ES")}
                      </td>
                      <td className="py-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => confirmDeleteUser(user)}
                        >
                          <i className="fas fa-trash mr-1" />
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Diálogo de confirmación para eliminar usuario */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              {userToDelete
                ? `¿Estás seguro de que deseas eliminar la cuenta de ${userToDelete.name}? Esta acción no se puede deshacer.`
                : ""}
            </DialogDescription>
            {deleteErrorMessage && (
              <p className="text-red-500 text-sm mt-2">{deleteErrorMessage}</p>
            )}
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={deleteUser}>
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
