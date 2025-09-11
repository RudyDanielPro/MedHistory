import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Header = ({ 
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

  const publicNavItems = [
    { path: "/", label: "Inicio" },
    { path: "/about", label: "Acerca de" },
    { path: "/contact", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 text-black shadow-lg bg-gradient-to-r ">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-logo-gradien to-logo-primary">
              <i className="text-lg text-white fas fa-user-md"></i>
            </div>
            <span className="font-serif text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-green-500 bg-clip-text">
              MedHistory
            </span>
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
                        ? "text-text-inicio border-text-inicio-border"
                        : "text-text-rest-navVar hover:text-blue-300 border-text-inicio-border"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 text-sm font-medium transition-colors border border-white rounded-md bg-register-bg hover:bg-register-bg-hover hover:text-white text-text-rest-navVar">
                    <Link to="/register">Registrarse</Link>
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-sign-bg hover:bg-sign-bg/90">
                    <Link to="/login">Iniciar sesión</Link>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Authenticated Navigation */}
                {userType === 'student' && (
                  <button className="px-4 py-2 font-medium text-white transition-colors border border-white rounded-md hover:bg-white hover:text-blue-800">
                    <Link to="/student/consultation" className="flex items-center">
                      <i className="mr-2 fas fa-file-medical"></i>
                      Realizar consulta
                    </Link>
                  </button>
                )}
                
                {/* Notifications */}
                <button className="relative w-10 h-10 text-white transition-colors border border-white rounded-md hover:bg-white hover:text-blue-800">
                  <Link to={`/${userType}/notifications`} className="flex items-center justify-center w-full h-full">
                    <i className="fas fa-bell"></i>
                    {notificationCount > 0 && (
                      <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button 
                    className="flex items-center px-4 py-2 font-medium text-white transition-colors border border-white rounded-md hover:bg-white hover:text-blue-800"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <i className="mr-2 fas fa-user"></i>
                    {userName}
                    <i className="ml-2 fas fa-chevron-down"></i>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
                      <Link
                        to={`/${userType}/profile`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="mr-2 fas fa-user-cog"></i>
                        Perfil
                      </Link>
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        <i className="mr-2 fas fa-sign-out-alt"></i>
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center w-10 h-10 text-white transition-colors border border-white rounded-md md:hidden hover:bg-white hover:text-blue-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="pt-4 pb-4 mt-4 border-t border-white md:hidden border-opacity-20">
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-blue-300"
                        : "text-white hover:text-blue-300"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-2 font-medium text-white transition-colors border border-white rounded-md hover:bg-white hover:text-blue-800">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      Registrarse
                    </Link>
                  </button>
                  <button className="px-4 py-2 font-medium text-blue-800 transition-colors bg-white rounded-md hover:bg-blue-100">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Iniciar sesión
                    </Link>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {userType === 'student' && (
                  <Link
                    to="/student/consultation"
                    className="flex items-center text-white hover:text-blue-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="mr-2 fas fa-file-medical"></i>
                    Realizar consulta
                  </Link>
                )}
                <Link
                  to={`/${userType}/notifications`}
                  className="flex items-center text-white hover:text-blue-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="mr-2 fas fa-bell"></i>
                  Notificaciones
                  {notificationCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 ml-2 text-xs text-white bg-red-500 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to={`/${userType}/profile`}
                  className="flex items-center text-white hover:text-blue-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="mr-2 fas fa-user-cog"></i>
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-left text-white hover:text-blue-300"
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