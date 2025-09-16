import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";


export function TermsAndConditions() {
    return(
        <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-file-contract"></i>
            Términos y Condiciones
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90">
            Condiciones de uso de la plataforma MedHistory
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 medical-card">
              <div className="prose prose-lg max-w-none">
                <p className="mb-8 text-center text-muted-foreground">
                  <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      1. Aceptación de los Términos
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      Al acceder y utilizar la plataforma MedHistory, usted acepta estar sujeto a estos 
                      términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos 
                      términos, no debe utilizar nuestro servicio.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      2. Descripción del Servicio
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      MedHistory es una plataforma web diseñada para facilitar la evaluación remota 
                      de estudiantes de medicina por parte de doctores especializados. El servicio incluye:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li>Sistema de autenticación para estudiantes y doctores</li>
                      <li>Formularios de consulta médica para estudiantes</li>
                      <li>Sistema de evaluación y calificación para doctores</li>
                      <li>Sistema de notificaciones en tiempo real</li>
                      <li>Gestión de perfiles de usuario</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      3. Registro de Usuario
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Para utilizar MedHistory, los administradores deben registrar a los usuarios proporcionandoles su cuenta a cada uno de ellos:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li>Es responsabilidad del usuario mantener la confidencialidad de sus credenciales</li>
                      <li>Está prohibido compartir cuentas entre usuarios</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      4. Uso Aceptable
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Los usuarios se comprometen a utilizar la plataforma únicamente para fines educativos 
                      y profesionales médicos. Está estrictamente prohibido:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li>Proporcionar información médica falsa o engañosa</li>
                      <li>Usar la plataforma para diagnósticos reales de pacientes</li>
                      <li>Compartir información confidencial fuera de la plataforma</li>
                      <li>Intentar acceder a cuentas de otros usuarios</li>
                      <li>Interferir con el funcionamiento normal del servicio</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      5. Privacidad y Protección de Datos
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      La protección de sus datos personales es fundamental para nosotros. Toda la información 
                      se maneja de acuerdo con nuestra Política de Privacidad y cumple con estándares 
                      internacionales de seguridad médica. Los datos se utilizan únicamente para fines 
                      educativos y de evaluación dentro de la plataforma.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      6. Responsabilidades del Usuario
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Estudiantes:</h3>
                        <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                          <li>Proporcionar casos de estudio precisos y detallados</li>
                          <li>Respetar las evaluaciones y comentarios de los doctores</li>
                          <li>Utilizar la retroalimentación para mejora académica</li>
                          <li>No usar información real de pacientes</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Doctores:</h3>
                        <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                          <li>Proporcionar evaluaciones constructivas y profesionales</li>
                          <li>Mantener estándares éticos médicos</li>
                          <li>Respetar la confidencialidad de la información</li>
                          <li>Evaluar de manera justa y objetiva</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      7. Limitación de Responsabilidad
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      MedHistory es una plataforma educativa. No nos hacemos responsables por decisiones 
                      médicas tomadas basándose en las interacciones en la plataforma. El servicio se 
                      proporciona "tal como está" y no garantizamos disponibilidad continua o libre de errores.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      8. Modificaciones del Servicio
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto 
                      del servicio en cualquier momento. Las modificaciones importantes se comunicarán 
                      a los usuarios con anticipación razonable.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      9. Terminación de Cuenta
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      Podemos suspender o terminar cuentas que violen estos términos. Los usuarios 
                      pueden cancelar sus cuentas en cualquier momento contactando con nuestro soporte.
                    </p>
                  </div>                  
                </div>                
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    )
}