import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { useState } from "react";

export function Contact () {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [toast, setToast] = useState({ show: false, title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Llamar al endpoint para enviar el correo
      const response = await fetch('http://rudy-backend-e2itqr-09d86f-31-97-130-237.traefik.me/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: ['mendez10dev@gmail.com', 'rudydanielcarballo@gmail.com'],
          from: formData.email,
          fromName: formData.name,
          message: formData.message,
          subject: formData.subject
        })
      });

      if (response.ok) {
        setToast({
          show: true,
          title: "Mensaje enviado",
          description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
        });
      } else {
        // Proporciona más información sobre el error
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setToast({
        show: true,
        title: "Error",
        description: "Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ show: false, title: "", description: "" });
      }, 3000);
      
      // Reset form only on success
      if (toast.title !== "Error") {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqItems = [
    {
      question: "¿Cómo me registro como doctor?",
      answer: "Para registrarse como doctor necesitas que el administrador cree tu cuenta administración. Contacta con los administradores para ser registrado."
    },
    {
      question: "¿Qué información necesito para realizar una consulta?",
      answer: "Necesitas los datos completos del paciente (nombre, CI, edad, peso, síntomas) y tu evaluación médica detallada incluyendo diagnóstico y tratamiento propuesto."
    },
    {
      question: "¿Cómo recibo las evaluaciones de los doctores?",
      answer: "Recibirás notificaciones automáticas cuando un doctor evalúe tu consulta. Puedes ver la calificación y comentarios en tu dashboard."
    },
    {
      question: "¿Es segura la plataforma para datos médicos?",
      answer: "Sí, utilizamos encriptación de datos y cumplimos con estándares internacionales de seguridad médica para proteger toda la información."
    },
    {
      question: "¿Puedo acceder desde dispositivos móviles?",
      answer: "Absolutamente. MedHistory está optimizada para funcionar perfectamente en computadoras, tablets y smartphones."
    }
  ];

  return (
    <>
      <Header/>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 max-w-sm bg-white border-l-4 border-green-500 shadow-lg rounded-md p-4 flex items-start space-x-3 transform transition-all duration-300 ease-in-out">
          <div className="flex-shrink-0">
            <i className={`fas ${toast.title === "Error" ? "fa-exclamation-circle text-red-500" : "fa-check-circle text-green-500"} text-lg`}></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{toast.title}</h4>
            <p className="mt-1 text-sm text-gray-600">{toast.description}</p>
          </div>
        </div>
      )}
      
      {/* Contacto */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading">
            <i className="mr-4 fas fa-envelope"></i>
            Contacto
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para apoyarte 
            en tu experiencia con MedHistory.
          </p>
        </div>
      </section>

      {/*Contact Form and Info*/}
      <section className="py-16 bg-form-bg-color">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <div className="p-8 medical-card">
                <h2 className="mb-6 text-2xl font-bold font-heading text-foreground">
                  <i className="mr-3 fas fa-paper-plane text-primary"></i>
                  Envíanos un mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-foreground">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent bg-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent bg-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-foreground">
                      Asunto
                    </label>
                    <select 
                      value={formData.subject} 
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 transition-colors border rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="soporte-tecnico">Soporte Técnico</option>
                      <option value="registro-doctor">Registro como Doctor</option>
                      <option value="dudas-plataforma">Dudas sobre la Plataforma</option>
                      <option value="sugerencias">Sugerencias</option>
                      <option value="reportar-problema">Reportar Problema</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-foreground">
                      Mensaje (Escriba más de 10 letras)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[120px]"
                      placeholder="Describe tu consulta o mensaje..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="mr-2 fas fa-spinner fa-spin"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="mr-2 fas fa-paper-plane"></i>
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="p-8 medical-card">
                <h2 className="mb-6 text-2xl font-bold font-heading text-foreground">
                  <i className="mr-3 fas fa-info-circle text-primary"></i>
                  Información de contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10">
                      <i className="text-xl fas fa-envelope text-primary"></i>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Correo electrónico</h3>
                      <p className="text-muted-foreground">mendez10dev@gmail.com</p>
                      <p className="text-muted-foreground">rudydanielcarballo@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10">
                      <i className="text-xl fas fa-phone text-accent"></i>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Teléfono</h3>
                      <p className="text-muted-foreground">+53 58-03-07-95</p>
                      <p className="text-muted-foreground">+53 56-49-85-46</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10">
                      <i className="text-xl fas fa-clock text-secondary"></i>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Horario de atención</h3>
                      <p className="text-muted-foreground">Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sábados: 9:00 AM - 2:00 PM</p>
                      <p className="text-muted-foreground">Domingos: Cerrado</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10">
                      <i className="text-xl fas fa-university text-primary"></i>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Institución</h3>
                      <p className="text-muted-foreground">Universidad de las Ciencias Informáticas</p>
                      <p className="text-muted-foreground">La Habana, Cuba</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enlaces rápidos */}
              <div className="p-6 medical-card">
                <h3 className="mb-4 text-lg font-semibold font-heading text-foreground">
                  <i className="mr-2 fas fa-external-link-alt text-accent"></i>
                  Enlaces rápidos
                </h3>
                <div className="space-y-3">                  
                  <a href="/terms" className="flex items-center transition-colors text-muted-foreground hover:text-primary">
                    <i className="mr-2 fas fa-file-contract"></i>
                    Términos y condiciones
                  </a>
                  <a href="/privacy" className="flex items-center transition-colors text-muted-foreground hover:text-primary">
                    <i className="mr-2 fas fa-shield-alt"></i>
                    Política de privacidad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl font-heading text-foreground">
              <i className="mr-3 fas fa-question-circle text-primary"></i>
              Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Frecuentes</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Encuentra respuestas a las preguntas más comunes sobre MedHistory.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="px-6 medical-card">
                  <details className="group">
                    <summary className="flex items-center justify-between py-4 font-semibold list-none cursor-pointer">
                      <span>{item.question}</span>
                      <span className="transition group-open:rotate-180">
                        <i className="fas fa-chevron-down text-primary"></i>
                      </span>
                    </summary>
                    <div className="pb-4 leading-relaxed text-muted-foreground">
                      {item.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        
      <Footer/>
    </>
  );
}