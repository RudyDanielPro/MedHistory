import { Link } from "react-router-dom";

export function Footer  ({ isAuthenticated = false })  {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <i className="fas fa-user-md text-white text-lg"></i>
              </div>
              <span className="text-2xl font-heading font-bold text-white">
                MedHistory
              </span>
            </div>
            <p className="text-secondary-foreground/80 mb-6 max-w-md">
              Plataforma profesional para facilitar la evaluación remota de estudiantes 
              de medicina por parte de doctores especializados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-white">
              Enlaces rápidos
            </h4>
            <ul className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/notifications" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Notificaciones
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className="text-secondary-foreground/80 hover:text-accent transition-colors"
                    >
                      Mi Perfil
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-white">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope text-accent mt-1"></i>
                <div>
                  <p className="text-secondary-foreground/80 text-sm">
                    aliant@estudiantes.uci.cu <br />
                    rudysc@estudiantes.uci.cu
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-phone text-accent mt-1"></i>
                <div>
                  <p className="text-secondary-foreground/80 text-sm">
                    +53 56498546 <br />
                    +53 58030795
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-clock text-accent mt-1"></i>
                <div>
                  <p className="text-secondary-foreground/80 text-sm">
                    Lun - Vie: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-foreground/60 text-sm">
              © {currentYear} MedHistory. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/terms" 
                className="text-secondary-foreground/60 hover:text-accent transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link 
                to="/privacy" 
                className="text-secondary-foreground/60 hover:text-accent transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};