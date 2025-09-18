import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

// Componente Button
const Button = ({ children, type = "button", className = "", disabled = false, onClick }) => {
    return (
        <button
            type={type}
            className={`btn ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Componente Input
const Input = ({ id, name, type = "text", value, onChange, className = "", placeholder = "" }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`input ${className}`}
            placeholder={placeholder}
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

// Componente RadioGroup
const RadioGroup = ({ value, onValueChange, children, className = "" }) => {
    return (
        <div className={`radio-group ${className}`}>
            {children}
        </div>
    );
};

// Componente RadioGroupItem
const RadioGroupItem = ({ value, id, children, selectedValue, onValueChange }) => {
    const isSelected = selectedValue === value;

    return (
        <div
            className={`radio-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onValueChange(value)}
        >
            <input
                type="radio"
                id={id}
                name="userType"
                value={value}
                checked={isSelected}
                onChange={() => onValueChange(value)}
                className="radio-input"
            />
            {children}
        </div>
    );
};

// Componente Checkbox
const Checkbox = ({ id, checked, onCheckedChange }) => {
    return (
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className="checkbox"
        />
    );
};

export function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        acceptTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Validación de nombre de usuario
        if (!formData.username.trim()) {
            newErrors.username = "El nombre de usuario es requerido";
        } else if (formData.username.length < 3) {
            newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres";
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "El correo electrónico es requerido";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Formato de correo electrónico inválido";
        }

        // Validación de contraseña
        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        // Validación de confirmación de contraseña
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirma tu contraseña";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        // Validación de tipo de usuario
        if (!formData.userType) {
            newErrors.userType = "Selecciona el tipo de usuario";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showToast = (title, description, variant = 'default') => {
        // Simulación básica de toast
        console.log(`${variant.toUpperCase()}: ${title} - ${description}`);
        alert(`${title}: ${description}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Obtener el token del administrador del localStorage
            const adminToken = localStorage.getItem('authToken');
            
            if (!adminToken) {
                throw new Error('No se encontró el token de autenticación. Por favor, inicia sesión como administrador.');
            }

            // Preparar datos para la API
            const userData = {                
                email: formData.email,
                password: formData.password,
                role: formData.userType,
                username: formData.username // Añadir username si el backend lo requiere
            };

            // Hacer la petición POST al endpoint con el token de autorización
            const response = await fetch('http://rudy-backend-e2itqr-09d86f-31-97-130-237.traefik.me/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(userData)
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            // Procesar respuesta exitosa
            const data = await response.json();

            showToast(
                "Registro exitoso",
                `Te has registrado como ${formData.userType}.`
            );

            // Resetear formulario
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                userType: "",
                acceptTerms: false
            });
        } catch (error) {
            showToast(
                "Error en el registro",
                error.message || "Hubo un problema al crear tu cuenta. Inténtalo de nuevo.",
                "destructive"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: val
        }));

        // Limpiar error cuando el usuario comienza a escribir
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-12 hero-section">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl font-heading">
                        <i className="mr-4 fas fa-user-plus"></i>
                        Registro
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-white/90">
                        Únete a MedHistory y comienza tu experiencia en evaluación médica profesional.
                    </p>
                </div>
            </section>

            {/* Registration Form */}
            <section className="items-center py-16 bg-background">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto">
                        {/* Botón Cancelar Registro - Centrado sobre el formulario */}
                        <div className="flex justify-center mb-6">
                            <Link to={"/admin/dashboard"}>
                                <button className="px-6 py-2 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700">
                                    <i className="mr-2 fas fa-times"></i>
                                    Cancelar Registro
                                </button>
                            </Link>
                        </div>

                        <div className="p-8 medical-card">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Username */}
                                <div>
                                    <Label htmlFor="username">
                                        <i className="mr-2 fas fa-user text-primary"></i>
                                        Nombre de usuario
                                    </Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`medical-input ${errors.username ? 'border-destructive' : ''}`}
                                        placeholder="Ingresa tu nombre de usuario"
                                    />
                                    {errors.username && (
                                        <p className="mt-1 text-sm text-destructive">{errors.username}</p>
                                    )}
                                </div>

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
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-destructive">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <Label htmlFor="confirmPassword">
                                        <i className="mr-2 fas fa-lock text-primary"></i>
                                        Confirmar contraseña
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`medical-input ${errors.confirmPassword ? 'border-destructive' : ''}`}
                                        placeholder="Repite tu contraseña"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* User Type */}
                                <div>
                                    <Label className="text-base font-semibold">
                                        <i className="mr-2 fas fa-users text-primary"></i>
                                        Tipo de usuario
                                    </Label>
                                    <RadioGroup
                                        value={formData.userType}
                                        onValueChange={(value) => setFormData({ ...formData, userType: value })}
                                        className="mt-3"
                                    >
                                        <RadioGroupItem
                                            value="student"
                                            id="student"
                                            selectedValue={formData.userType}
                                            onValueChange={(value) => setFormData({ ...formData, userType: value })}
                                        >
                                            <Label htmlFor="student" className="flex-1 cursor-pointer">
                                                <div className="flex items-center space-x-3">
                                                    <i className="text-xl fas fa-graduation-cap text-accent"></i>
                                                    <div>
                                                        <div className="font-semibold">Estudiante de Medicina</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Realiza consultas médicas para evaluación
                                                        </div>
                                                    </div>
                                                </div>
                                            </Label>
                                        </RadioGroupItem>

                                        <RadioGroupItem
                                            value="doctor"
                                            id="doctor"
                                            selectedValue={formData.userType}
                                            onValueChange={(value) => setFormData({ ...formData, userType: value })}
                                        >
                                            <Label htmlFor="doctor" className="flex-1 cursor-pointer">
                                                <div className="flex items-center space-x-3">
                                                    <i className="text-xl fas fa-user-md text-primary"></i>
                                                    <div>
                                                        <div className="font-semibold">Doctor Especialista</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Evalúa y califica consultas de estudiantes
                                                        </div>
                                                    </div>
                                                </div>
                                            </Label>
                                        </RadioGroupItem>

                                        <RadioGroupItem
                                            value="admin"
                                            id="admin"
                                            selectedValue={formData.userType}
                                            onValueChange={(value) => setFormData({ ...formData, userType: value })}
                                        >
                                            <Label htmlFor="admin" className="flex-1 cursor-pointer">
                                                <div className="flex items-center space-x-3">
                                                    <i className="text-xl text-purple-500 fas fa-user-cog"></i>
                                                    <div>
                                                        <div className="font-semibold">Administrador del Sistema</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Gestiona usuarios y configuración del sistema
                                                        </div>
                                                    </div>
                                                </div>
                                            </Label>
                                        </RadioGroupItem>
                                    </RadioGroup>
                                    {errors.userType && (
                                        <p className="mt-1 text-sm text-destructive">{errors.userType}</p>
                                    )}
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
                                            Creando cuenta...
                                        </>
                                    ) : (
                                        <>
                                            <i className="mr-2 fas fa-user-plus"></i>
                                            Crear cuenta
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Login Link */}
                            <div className="pt-6 mt-6 text-center border-t border-border">
                                <p className="text-muted-foreground">
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link to="/login" className="font-semibold text-primary hover:underline">
                                        Iniciar sesión
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}