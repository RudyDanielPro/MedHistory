import { Link } from "react-router-dom";

export function Footer  ({ isAuthenticated = false })  {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary">
                <i className="text-lg text-white fas fa-user-md"></i>
              </div>
              <span className="text-2xl font-bold text-white font-heading">
                MedHistory
              </span>
            </div>
            <p className="max-w-md mb-6 text-secondary-foreground/80">
              Plataforma profesional para facilitar la evaluación remota de estudiantes 
              de medicina por parte de doctores especializados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors text-secondary-foreground/60 hover:text-accent">
                <i className="text-xl fab fa-facebook-f"></i>
              </a>
              <a href="#" className="transition-colors text-secondary-foreground/60 hover:text-accent">
                <i className="text-xl fab fa-twitter"></i>
              </a>
              <a href="#" className="transition-colors text-secondary-foreground/60 hover:text-accent">
                <i className="text-xl fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="transition-colors text-secondary-foreground/60 hover:text-accent">
                <i className="text-xl fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white font-heading">
              Enlaces rápidos
            </h4>
            <ul className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/" 
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
                    >
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
                    >
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
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
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/notifications" 
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
                    >
                      Notificaciones
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className="transition-colors text-secondary-foreground/80 hover:text-accent"
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
            <h4 className="mb-4 text-lg font-semibold text-white font-heading">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="mt-1 fas fa-envelope text-accent"></i>
                <div>
                  <p className="text-sm text-secondary-foreground/80">
                    soporte@medhistory.com
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="mt-1 fas fa-phone text-accent"></i>
                <div>
                  <p className="text-sm text-secondary-foreground/80">
                    +53 5555-5555
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="mt-1 fas fa-clock text-accent"></i>
                <div>
                  <p className="text-sm text-secondary-foreground/80">
                    Lun - Vie: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-secondary-foreground/60">
              © {currentYear} MedHistory. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/terms" 
                className="transition-colors text-secondary-foreground/60 hover:text-accent"
              >
                Términos y Condiciones
              </Link>
              <Link 
                to="/privacy" 
                className="transition-colors text-secondary-foreground/60 hover:text-accent"
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