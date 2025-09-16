import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

export function PrivacyPolicy  ()  {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-shield-alt"></i>
            Política de Privacidad
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90">
            Cómo protegemos y manejamos tu información en MedHistory
          </p>
        </div>
      </section>

      {/* Privacy Content */}
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
                      1. Introducción
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      En MedHistory, valoramos su privacidad y nos comprometemos a proteger sus datos 
                      personales. Esta política explica cómo recopilamos, utilizamos, almacenamos y 
                      protegemos su información cuando utiliza nuestra plataforma de evaluación médica educativa.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      2. Información que Recopilamos
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">
                          2.1 Información de Registro
                        </h3>
                        <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                          <li>Nombre de usuario y correo electrónico</li>
                          <li>Tipo de usuario (estudiante o doctor)</li>
                          <li>Información académica o profesional relevante</li>                        
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">
                          2.2 Información de Consultas Médicas
                        </h3>
                        <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                          <li>Datos de casos clínicos simulados (sin información real de pacientes)</li>
                          <li>Evaluaciones y diagnósticos educativos</li>
                          <li>Calificaciones y comentarios de doctores</li>
                          <li>Historial de consultas y evaluaciones</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">
                          2.3 Información Técnica
                        </h3>
                        <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                          <li>Dirección IP y datos de ubicación general</li>
                          <li>Información del navegador y dispositivo</li>
                          <li>Patrones de uso de la plataforma</li>
                          <li>Logs de actividad y acceso</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      3. Cómo Utilizamos su Información
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Utilizamos la información recopilada únicamente para los siguientes propósitos:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li>Proporcionar y mantener los servicios de la plataforma</li>
                      <li>Facilitar la comunicación entre estudiantes y doctores</li>
                      <li>Procesar evaluaciones y generar calificaciones</li>
                      <li>Enviar notificaciones relevantes sobre la plataforma</li>
                      <li>Mejorar la seguridad y funcionalidad del servicio</li>
                      <li>Cumplir con requisitos legales aplicables</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      4. Compartir Información
                    </h2>
                    <div className="p-6 mb-4 border rounded-lg bg-accent/5 border-accent/20">
                      <h3 className="mb-3 text-lg font-semibold text-foreground">
                        <i className="mr-2 fas fa-exclamation-triangle text-accent"></i>
                        Principio Fundamental
                      </h3>
                      <p className="text-muted-foreground">
                        No vendemos, alquilamos ni compartimos su información personal con terceros 
                        para fines comerciales. La información solo se comparte dentro del contexto 
                        educativo de la plataforma.
                      </p>
                    </div>
                    
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      La información se comparte únicamente en las siguientes circunstancias:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li>Entre estudiantes y doctores asignados para evaluaciones específicas</li>
                      <li>Con instituciones educativas participantes (si aplicable)</li>
                      <li>Cuando sea requerido por ley o autoridades competentes</li>
                      <li>Para proteger la seguridad de usuarios o la integridad de la plataforma</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      5. Seguridad de Datos
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Implementamos múltiples capas de seguridad para proteger su información:
                    </p>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                        <h3 className="mb-3 text-lg font-semibold text-foreground">
                          <i className="mr-2 fas fa-lock text-primary"></i>
                          Cifrado y Protección
                        </h3>
                        <ul className="pl-6 space-y-1 list-disc text-muted-foreground">
                          <li>Cifrado SSL/TLS para transmisión de datos</li>
                          <li>Cifrado de base de datos</li>
                          <li>Autenticación de dos factores (opcional)</li>
                          <li>Contraseñas seguras requeridas</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-secondary/5 border-secondary/20">
                        <h3 className="mb-3 text-lg font-semibold text-foreground">
                          <i className="mr-2 fas fa-shield-alt text-secondary"></i>
                          Acceso y Control
                        </h3>
                        <ul className="pl-6 space-y-1 list-disc text-muted-foreground">
                          <li>Acceso restringido a datos personales</li>
                          <li>Monitoreo continuo de seguridad</li>
                          <li>Copias de seguridad regulares</li>
                          <li>Auditorías de seguridad periódicas</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      6. Sus Derechos
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Como usuario de MedHistory, usted tiene los siguientes derechos:
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <i className="mt-1 fas fa-eye text-accent"></i>
                          <div>
                            <h4 className="font-semibold text-foreground">Acceso</h4>
                            <p className="text-sm text-muted-foreground">Ver qué información tenemos sobre usted</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="mt-1 fas fa-edit text-accent"></i>
                          <div>
                            <h4 className="font-semibold text-foreground">Corrección</h4>
                            <p className="text-sm text-muted-foreground">Actualizar o corregir información inexacta</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <i className="mt-1 fas fa-trash text-accent"></i>
                          <div>
                            <h4 className="font-semibold text-foreground">Eliminación</h4>
                            <p className="text-sm text-muted-foreground">Solicitar eliminación de sus datos</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="mt-1 fas fa-download text-accent"></i>
                          <div>
                            <h4 className="font-semibold text-foreground">Portabilidad</h4>
                            <p className="text-sm text-muted-foreground">Exportar sus datos en formato legible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      7. Retención de Datos
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Conservamos su información durante los siguientes períodos:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li><strong>Datos de cuenta activa:</strong> Mientras mantenga su cuenta activa</li>
                      <li><strong>Historial académico:</strong> Hasta 7 años después de la graduación (fines educativos)</li>
                      <li><strong>Datos de comunicación:</strong> 2 años después del último contacto</li>
                      <li><strong>Logs técnicos:</strong> 1 año para fines de seguridad</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      8. Cookies y Tecnologías Similares
                    </h2>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Utilizamos cookies y tecnologías similares para:
                    </p>
                    <ul className="pl-6 space-y-2 list-disc text-muted-foreground">
                      <li>Mantener su sesión activa de forma segura</li>
                      <li>Recordar sus preferencias de usuario</li>
                      <li>Analizar el uso de la plataforma para mejoras</li>
                      <li>Proporcionar funcionalidades personalizadas</li>
                    </ul>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Puede configurar su navegador para rechazar cookies, aunque esto puede afectar 
                      la funcionalidad de la plataforma.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold font-heading text-foreground">
                      9. Cambios en la Política
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      Podemos actualizar esta política de privacidad ocasionalmente. Los cambios 
                      importantes se comunicarán a través de la plataforma y por correo electrónico. 
                      El uso continuado de MedHistory después de los cambios constituye aceptación 
                      de la política actualizada.
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
  );
};

