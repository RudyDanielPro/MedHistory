import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Cerrar menús al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Para el menú móvil
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      
      // Para el dropdown de usuario
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isDropdownOpen]);

  const isActive = (path) => location.pathname === path;

  const publicNavItems = [
    { path: "/", label: "Inicio", icon: "fa-home" },
    { path: "/about", label: "Acerca de", icon: "fa-info-circle" },
    { path: "/contact", label: "Contacto", icon: "fa-envelope" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-green-600 to-green-800">
      <div className="w-full px-4 py-3 mx-auto bg-white sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500">
              <i className="text-lg text-white fas fa-user-md"></i>
            </div>
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text sm:text-2xl">
              MedHistory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-6 md:flex lg:space-x-8">
            {!isAuthenticated ? (
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 font-medium text-white transition-colors bg-green-600 rounded-md hover:bg-green-700">
                    <Link to="/login">Iniciar sesión</Link>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Authenticated Navigation */}
                {userType === 'student' && (
                  <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 border border-green-600 rounded-md hover:bg-green-700">
                    <Link to="/student/consultation" className="flex items-center">
                      <i className="mr-2 fas fa-file-medical"></i>
                      Realizar consulta
                    </Link>
                  </button>
                )}
                
                {/* Notifications */}
                <button className="relative w-10 h-10 text-green-600 transition-colors border border-green-300 rounded-md hover:bg-green-50">
                  <Link to={`/${userType}/notifications`} className="flex items-center justify-center w-full h-full">
                    <i className="fas fa-bell"></i>
                    {notificationCount > 0 && (
                      <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                </button>

                {/* User Menu */}
                <div className="relative user-dropdown">
                  <button 
                    className="flex items-center px-4 py-2 text-sm font-medium text-green-600 transition-colors border border-green-300 rounded-md hover:bg-green-50"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <i className="mr-2 fas fa-user"></i>
                    {userName}
                    <i className="ml-2 fas fa-chevron-down"></i>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                      <Link
                        to={`/${userType}/profile`}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="mr-3 fas fa-user-cog"></i>
                        Perfil
                      </Link>
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50"
                      >
                        <i className="mr-3 fas fa-sign-out-alt"></i>
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
            ref={buttonRef}
            className="flex items-center justify-center w-10 h-10 text-white transition-colors rounded-md md:hidden hover:bg-green-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            <i className={`text-xl fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation - FONDO VERDE */}
        <div 
          ref={menuRef}
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-gradient-to-r from-green-600 to-green-800 rounded-lg mt-2 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-3 pb-4">
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center py-2.5 px-4 font-medium transition-colors rounded-lg mx-2 ${
                      isActive(item.path)
                        ? "text-white bg-green-700 bg-opacity-50"
                        : "text-white hover:bg-green-700 hover:bg-opacity-30"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`mr-3 ${item.icon}`}></i>
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col pt-2 mx-2 space-y-3">                  
                  <button className="px-4 py-2.5 font-medium text-white transition-colors border border-white rounded-md hover:bg-white hover:text-green-700">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center">
                      <i className="mr-2 fas fa-sign-in-alt"></i>
                      Iniciar sesión
                    </Link>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col mx-2 space-y-2">
                {userType === 'student' && (
                  <Link
                    to="/student/consultation"
                    className="flex items-center py-2.5 px-4 text-white rounded-lg hover:bg-green-700 hover:bg-opacity-30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="mr-3 fas fa-file-medical"></i>
                    Realizar consulta
                  </Link>
                )}
                <Link
                  to={`/${userType}/notifications`}
                  className="flex items-center py-2.5 px-4 text-white rounded-lg hover:bg-green-700 hover:bg-opacity-30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="mr-3 fas fa-bell"></i>
                  Notificaciones
                  {notificationCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 ml-2 text-xs text-white bg-red-500 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to={`/${userType}/profile`}
                  className="flex items-center py-2.5 px-4 text-white rounded-lg hover:bg-green-700 hover:bg-opacity-30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="mr-3 fas fa-user-cog"></i>
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center py-2.5 px-4 text-left text-white rounded-lg hover:bg-green-700 hover:bg-opacity-30"
                >
                  <i className="mr-3 fas fa-sign-out-alt"></i>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};